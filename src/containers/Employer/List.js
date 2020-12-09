import React, {createRef, useEffect, useState} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";
import EmployerList from "../../components/Employer/List/List";

const FIND_EMPLOYERS = gql`
    query FindEmployers(
        $offset: Int = 0,
        $searchQuery: String,
        $orderBy: OrderByInput,
    ) {
        findEmployers(
            offset: $offset,
            searchQuery: $searchQuery,
            orderBy: $orderBy,
        ) {
            id
            lastName
            firstName
            middleName
            phone
            roleId
            percentage
            directions {
                name
            }
            deletedAt
        }
    }
`;

const DELETE_EMPLOYER = gql`
    mutation DeleteEmployer(
        $id: ID!,
    ) {
        deleteEmployer(
            id: $id,
        ) {
            success
            message
            employer {
                id
                deletedAt
            }
        }
    }
`;

const RESTORE_EMPLOYER = gql`
    mutation RestoreEmployer(
        $id: ID!,
    ) {
        restoreEmployer(
            id: $id,
        ) {
            success
            message
            employer {
                id
                deletedAt
            }
        }
    }
`;

const orderByOptions = {
    'А-Я': {column: 'lastName', direction: 'ASC'},
    'По дате': {column: 'createdAt', direction: 'DESC'}
};

function List() {

    const [messages, setMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState(orderByOptions['А-Я']);
    const orderBySelect = createRef();

    const {
        data: findEmployersData,
        loading: findEmployersLoading,
        error: findEmployersError,
        fetchMore: findEmployersFetchMore
    } = useQuery(FIND_EMPLOYERS, {
        variables: {
            searchQuery,
            orderBy,
        },
        pollInterval: (1000 * 60),
    });

    const [deleteEmployer, {loading: deleteEmployerLoading, error: deleteEmployerError}] = useMutation(DELETE_EMPLOYER);
    const [restoreEmployer, {loading: restoreEmployerLoading, error: restoreEmployerError}] = useMutation(RESTORE_EMPLOYER);

    useEffect(() => {
        orderBySelect.current.value = Object.keys(orderByOptions).find(value => orderByOptions[value] === orderBy);
    }, [orderBy, orderBySelect]);

    function onChangeOrderBy(e) {
        setOrderBy(orderByOptions[e.target.value]);
    }

    function onInputSearchQuery(e) {
        setSearchQuery(e.target.value);
    }

    async function handleDelete(e) {
        const {data} = await deleteEmployer({variables: {id: e.currentTarget.dataset.id}});
        if (data?.deleteEmployer?.success) {
            setMessages([...messages, {text: data?.deleteEmployer?.message, type: 'success'}]);
        }
    }

    async function handleRestore(e) {
        const {data} = await restoreEmployer({variables: {id: e.currentTarget.dataset.id}});
        if (data?.restoreEmployer?.success) {
            setMessages([...messages, {text: data?.restoreEmployer?.message, type: 'success'}]);
        }
    }

    async function handleLoadMore() {
        await findEmployersFetchMore({
            variables: {
                offset: findEmployersData?.findEmployers?.length || 0
            },
        });
    }

    return (<EmployerList
        messages={messages}
        error={findEmployersError || deleteEmployerError || restoreEmployerError}
        loading={findEmployersLoading || deleteEmployerLoading || restoreEmployerLoading}
        findEmployersData={findEmployersData}
        onChangeOrderBy={onChangeOrderBy}
        orderBySelect={orderBySelect}
        orderByOptions={orderByOptions}
        onInputSearchQuery={onInputSearchQuery}
        searchQuery={searchQuery}
        handleLoadMore={handleLoadMore}
        handleDelete={handleDelete}
        handleRestore={handleRestore}
    />);
}

export default List;

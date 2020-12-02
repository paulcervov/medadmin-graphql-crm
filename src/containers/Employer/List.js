import React, {createRef, useEffect, useState} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";
import EmployerList from "../../components/Employer/List/List";

const FIND_EMPLOYERS = gql`
    query FindEmployers(
        $page: Int,
        $searchQuery: String,
        $orderBy: OrderByInput,
    ) {
        findEmployers(
            page: $page,
            searchQuery: $searchQuery,
            orderBy: $orderBy,
        ) {
            data {
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
            currentPage
            hasMorePages
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


    useEffect(() => {
        if (findEmployersError || deleteEmployerError || restoreEmployerError) {
            setMessages([...messages, {text: 'Что-то пошло не так', type: 'danger'}]);
        }
    }, [findEmployersError, deleteEmployerError, restoreEmployerError, messages]);


    function onChangeOrderBy(e) {
        setOrderBy(orderByOptions[e.target.value]);
    }

    function onInputSearchQuery(e) {
        setSearchQuery(e.target.value);
    }

    async function onClickDelete(e) {
        try {
            const {data} = await deleteEmployer({variables: {id: e.currentTarget.dataset.id}});

            if (data?.deleteEmployer?.success) {
                setMessages([...messages, {text: data?.deleteEmployer?.message, type: 'success'}]);
            }
        } catch (err) {
            setMessages([...messages, {text: 'Что-то пошло не так', type: 'danger'}]);
        }
    }

    async function onClickRestore(e) {
        try {
            const {data} = await restoreEmployer({variables: {id: e.currentTarget.dataset.id}});
            if (data?.restoreEmployer?.success) {
                setMessages([...messages, {text: data?.restoreEmployer?.message, type: 'success'}]);
            }
        } catch (err) {
            setMessages([...messages, {text: 'Что-то пошло не так', type: 'danger'}]);
        }
    }

    async function onClickLoadMore() {
        await findEmployersFetchMore({
            variables: {
                page: findEmployersData.findEmployers.currentPage + 1
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev;

                return {
                    findEmployers: {
                        currentPage: fetchMoreResult.findEmployers.currentPage,
                        hasMorePages: fetchMoreResult.findEmployers.hasMorePages,
                        __typename: fetchMoreResult.findEmployers.__typename,
                        data: [...prev.findEmployers.data, ...fetchMoreResult.findEmployers.data]
                    }
                }
            }
        });
    }

    return (<EmployerList
        messages={messages}
        findEmployersData={findEmployersData}
        loading={findEmployersLoading || deleteEmployerLoading || restoreEmployerLoading}
        onChangeOrderBy={onChangeOrderBy}
        orderBySelect={orderBySelect}
        orderByOptions={orderByOptions}
        onInputSearchQuery={onInputSearchQuery}
        searchQuery={searchQuery}
        onClickLoadMore={onClickLoadMore}
        onClickDelete={onClickDelete}
        onClickRestore={onClickRestore}
    />);
}

export default List;

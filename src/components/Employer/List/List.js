import React, {createRef, useEffect, useState} from 'react';
import EmployerTable from "./Table/Table";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

const FIND_EMPLOYERS = gql`
    query findEmployers(
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
                email
                phone
                roleId
                percentage
                directions {
                    name
                }
            }
            currentPage
            hasMorePages
        }
    }
`;

const orderByOptions = {
    'А-Я': {column: 'lastName', direction: 'ASC'},
    'По дате': {column: 'createdAt', direction: 'DESC'}
};

function List() {
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState(orderByOptions['А-Я']);

    const orderBySelect = createRef();

    useEffect(() => {
        orderBySelect.current.value = Object.keys(orderByOptions).find(value => orderByOptions[value] === orderBy);
    }, [orderBy, orderBySelect]);

    const {data, loading, error, fetchMore} = useQuery(FIND_EMPLOYERS, {
        variables: {
            searchQuery,
            orderBy,
        },
        pollInterval: (1000 * 60),
    });

    async function onClickLoadMore() {
        await fetchMore({
            variables: {
                page: data.findEmployers.currentPage + 1
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev;

                return {
                    findEmployers: {
                        currentPage: fetchMoreResult.findEmployers.currentPage,
                            hasMorePages: fetchMoreResult.findEmployers.hasMorePages,
                            data: [...prev.findEmployers.data, ...fetchMoreResult.findEmployers.data]
                    }
                }
            }
        })
    }

    function onChangeOrderBy(e) {
        setOrderBy(orderByOptions[e.target.value]);
    }

    function onInputSearchQuery(e) {
        setSearchQuery(e.target.value);
    }

    return (<div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

        <h2 className="border-bottom pb-sm-2 mb-sm-4">Список сотрудников</h2>

        <div className="row mb-sm-3">

            <div className="col-sm-2">
                <select className="form-control" onChange={onChangeOrderBy} ref={orderBySelect}>
                    {Object.keys(orderByOptions).map(value => <option value={value} key={value}>{value}</option>)}
                </select>
            </div>

            <div className="col-sm-4">
                <input
                    className="form-control"
                    placeholder="Введите текст"
                    autoComplete="off"
                    onInput={onInputSearchQuery}
                    value={searchQuery}
                />
            </div>

            <div className="col-sm-auto ml-sm-auto">
                <Link className="btn btn-primary" to="/employers/create">Новый сотрудник</Link>
            </div>
        </div>

        {loading && <div className="alert alert-secondary">Загрузка...</div>}

        {error && <div className="alert alert-danger">Ошибка!</div>}

        {!loading && !error && !data.findEmployers.data.length && <div className="alert alert-warning">Не найдено</div>}

        {data && !!data.findEmployers.data.length && <>

            <EmployerTable employers={data.findEmployers.data}/>

            <button className="btn btn-primary"
                    onClick={onClickLoadMore}
                    disabled={!data.findEmployers.hasMorePages}
            >Загрузить еще
            </button>

        </>}

    </div>);
}

export default List;

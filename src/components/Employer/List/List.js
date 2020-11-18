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
        findUsers(
            page: $page,
            searchQuery: $searchQuery,
            orderBy: $orderBy,
        ) {
            data {
                id
                last_name
                first_name
                middle_name
                email
                phone
                role_id
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
    'А-Я': {column: 'last_name', direction: 'ASC'},
    'По дате': {column: 'created_at', direction: 'DESC'}
};

function List() {
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState(orderByOptions['А-Я']);

    const orderBySelect = createRef();

    useEffect(() => {
        const currentOrderByValue = Object.keys(orderByOptions).find(value => orderByOptions[value] === orderBy);
        orderBySelect.current.value = currentOrderByValue;
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
                page: data.findUsers.currentPage + 1
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev;

                return {
                    findUsers: {
                        currentPage: fetchMoreResult.findUsers.currentPage,
                            hasMorePages: fetchMoreResult.findUsers.hasMorePages,
                            data: [...prev.findUsers.data, ...fetchMoreResult.findUsers.data]
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

        {!loading && !error && !data.findUsers.data.length && <div className="alert alert-warning">Не найдено</div>}

        {data && !!data.findUsers.data.length && <>

            <EmployerTable employers={data.findUsers.data}/>

            <button className="btn btn-primary"
                    onClick={onClickLoadMore}
                    disabled={!data.findUsers.hasMorePages}
            >Загрузить еще
            </button>

        </>}

    </div>);
}

export default List;

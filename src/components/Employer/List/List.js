import React, {createRef, useEffect, useState} from 'react';
import EmployerTable from "./Table/Table";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

const FIND_EMPLOYERS = gql`
    query findEmployers(
        $searchQuery: String,
        $orderBy: [FindEmployersOrderByOrderByClause!],
        $page: Int = 1,
        $trashed: Trashed = WITHOUT

    ) {
        findEmployers(
            searchQuery: $searchQuery,
            orderBy: $orderBy,
            page: $page,
            trashed: $trashed
        ) {
            data {
                id
                last_name
                first_name
                middle_name
                email
                phone
                type
                percentage
                directions {
                    name
                }
                deleted_at
            }
            paginatorInfo {
                currentPage
                hasMorePages
            }
        }
    }
`;

const sortingOptions = {
    "А-Я": [{"field": "LAST_NAME", "order": "ASC"}],
    "По дате": [{"field": "CREATED_AT", "order": "ASC"}]
};

function List() {
    const [searchQuery, setSearchQuery] = useState('');
    const [orderBy, setOrderBy] = useState(sortingOptions["А-Я"]);

    const orderBySelect = createRef();

    useEffect(() => {
        const currentSortVariantKey = Object.keys(sortingOptions).find(key => sortingOptions[key] === orderBy);
        orderBySelect.current.value = currentSortVariantKey;
    }, [orderBy, orderBySelect]);

    const {data, loading, error, fetchMore} = useQuery(FIND_EMPLOYERS, {
        variables: {
            searchQuery,
            orderBy,
            trashed: 'WITH',
        },
        pollInterval: (1000 * 60),
    });

    async function onClickLoadMore() {
        await fetchMore({
            variables: {
                page: data.findEmployers.paginatorInfo.currentPage + 1
            },
            updateQuery: (prev, {fetchMoreResult}) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    findEmployers: {
                        data: [...prev.findEmployers.data, ...fetchMoreResult.findEmployers.data],
                        paginatorInfo: {...prev.findEmployers.paginatorInfo, ...fetchMoreResult.findEmployers.paginatorInfo},
                    }
                });
            }
        })
    }

    function onChangeOrderBy(e) {
        setOrderBy(sortingOptions[e.target.value]);
    }

    function onInputSearchQuery(e) {
        setSearchQuery(e.target.value);
    }

    return (<div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

        <h2 className="border-bottom pb-sm-2 mb-sm-4">Список сотрудников</h2>

        <div className="row mb-sm-3">

            <div className="col-sm-2">
                <select className="form-control" onChange={onChangeOrderBy} ref={orderBySelect}>
                    {Object.keys(sortingOptions).map(key => <option value={key} key={key}>{key}</option>)}
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
                    disabled={!data.findEmployers.paginatorInfo.hasMorePages}
            >Загрузить еще
            </button>

        </>}

    </div>);
}

export default List;

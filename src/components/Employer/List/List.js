import React, {useState} from 'react';
import EmployerTable from "./Table/Table";
import {gql, useQuery} from "@apollo/client";
import {Link} from "react-router-dom";

const FIND_EMPLOYERS = gql`
    query findEmployers($page: Int = 1, $searchQuery: String, $trashed: Trashed = WITHOUT) {
        findEmployers(page: $page, searchQuery: $searchQuery, trashed: $trashed) {
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

function List() {
    const [searchQuery, setSearchQuery] = useState('');
    const {data, loading, error, fetchMore} = useQuery(FIND_EMPLOYERS, {
        variables: {
            trashed: 'WITH',
            searchQuery
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

    function onInputSearchQuery(e) {
        setSearchQuery(e.target.value);
    }

    return (<div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

        {loading && <div className="alert alert-secondary">Загрузка...</div>}

        {error && <div className="alert alert-danger">Ошибка!</div>}

        {!loading && !error && !data && <div className="alert alert-warning">Не найдено</div>}

        {data && <>
            <h2 className="border-bottom pb-sm-2 mb-sm-4">Список сотрудников</h2>

            <div className="row mb-sm-3">

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

import React from 'react';
import {Link} from 'react-router-dom';
import EmployerTable from "../../components/Employer/Table/Table";
import LayoutDashboard from "../../components/Layout/Dashboard";

import {
    gql,
    useQuery
} from "@apollo/client";

const GET_EMPLOYERS = gql`
    query getEmployers($page: Int = 1, $trashed: Trashed = WITH) {
        getEmployers(page: $page, trashed: $trashed) {
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

function Index() {
    const {data, loading, error, fetchMore} = useQuery(GET_EMPLOYERS);

    async function onClickLoadMore() {
        await fetchMore({
            variables: {
                page: data.getEmployers.paginatorInfo.currentPage + 1
            },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                return Object.assign({}, prev, {
                    getEmployers: {
                        data: [...prev.getEmployers.data, ...fetchMoreResult.getEmployers.data],
                        paginatorInfo: {...prev.getEmployers.paginatorInfo, ...fetchMoreResult.getEmployers.paginatorInfo},
                    }
                });
            }
        })
    }

    return (
        <LayoutDashboard>
            <div className="container">
                <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

                    <h2 className="border-bottom pb-sm-2 mb-sm-4">Список сотрудников</h2>

                    <div className="row mb-sm-3">

                        <div className="col-sm-auto">

                        </div>

                        <div className="col-sm-auto ml-sm-auto">
                            <Link className="btn btn-primary" to="/employers/create">Новый сотрудник</Link>
                        </div>
                    </div>

                    {loading && <div className="alert alert-secondary">Загрузка...</div>}
                    {error && <div className="alert alert-danger">Ошибка</div>}
                    {!loading && !data && <div className="alert alert-warning">Не найдено</div>}

                    {data && <EmployerTable employers={data.getEmployers.data} />}

                    {data && <button className="btn btn-primary"
                            onClick={onClickLoadMore}
                            disabled={!data.getEmployers.paginatorInfo.hasMorePages}
                    >Загрузить еще</button>}
                </div>

            </div>
        </LayoutDashboard>
    )
}

export default Index;

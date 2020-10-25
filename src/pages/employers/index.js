import React from 'react';

import EmployerList from "../../components/Employer/List/List";
import LayoutDefault from "../../components/Layout/Default";

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

    return (
        <LayoutDefault>
            <div className="container">
                <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

                    <h2 className="border-bottom pb-sm-2 mb-sm-4">Список сотрудников</h2>

                    <div className="row mb-sm-3">

                        <div className="col-sm-auto">

                        </div>

                        <div className="col-sm-auto ml-sm-auto">
                            <a className="btn btn-primary" href="#">Новый сотрудник</a>
                        </div>
                    </div>

                    {loading && <p>Loading...</p>}
                    {error && <p>ERROR</p>}
                    {!data && <p>Not found</p>}

                    {data && <EmployerList employers={data.getEmployers.data}/>}
                </div>

            </div>
        </LayoutDefault>
    )
}

export default Index;

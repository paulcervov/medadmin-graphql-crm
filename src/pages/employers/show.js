import React from 'react';
import LayoutDashboard from "../../components/Layout/Dashboard";
import {Role as EmployerRole, RoleDescription as EmployerRoleDescription} from '../../types/Employer/Role';

import {gql, useQuery} from "@apollo/client";

const GET_EMPLOYER = gql`
    query getEmployer($id: ID!) {
        getEmployer(id: $id) {
            id
            last_name
            first_name
            middle_name
            phone
            type
            percentage
        }
    }
`;


function Show({match: {params: {id}}}) {
    const {data, loading, error} = useQuery(GET_EMPLOYER, {variables: {id}});

    return (
        <LayoutDashboard>
            <div className="container">
                <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

                    {loading && <div className="alert alert-secondary">Загрузка...</div>}
                    {error && <div className="alert alert-danger">Ошибка</div>}
                    {!loading && !data && <div className="alert alert-warning">Пользователь не найден</div>}

                    {data && <>
                        <h2 className="border-bottom pb-sm-2 mb-sm-4">{data.getEmployer.last_name} {data.getEmployer.first_name} {data.getEmployer.middle_name}</h2>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="mb-sm-1">Телефон</div>
                                <div className="font-weight-bolder">{data.getEmployer.phone}</div>
                            </div>

                            {(data.getEmployer.type === EmployerRole.DOCTOR)  && <>
                                <div className="col-sm-4">
                                    <div className="mb-sm-1 mt-sm-3">Процент от услуги</div>
                                    <div className="font-weight-bolder">{data.getEmployer.percentage}</div>
                                </div>
                            </>}
                        </div>

                        <div className="row">

                            <div className="col-sm-4">
                                <div className="mb-sm-1 mt-sm-3">Роль</div>
                                <div className="font-weight-bolder">{EmployerRoleDescription[data.getEmployer.type]}</div>
                            </div>

                            {(data.getEmployer.type === EmployerRole.DOCTOR) && <>
                                <div className="col-sm-8">
                                    <div className="mb-sm-1 mt-sm-3">Направления</div>
                                    <div className="font-weight-bolder">{data.getEmployer.directions.join(', ')}</div>
                                </div>
                            </>}
                        </div>
                    </>}
                </div>
            </div>
        </LayoutDashboard>
    )
}

export default Show;

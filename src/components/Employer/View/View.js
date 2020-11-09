import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {Role as EmployerRole, RoleDescription as EmployerRoleDescription} from '../../../types/Employer/Role';
import {useRouteMatch} from "react-router-dom";

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
            directions {
                name
            }
        }
    }
`;

function View() {

    const {params: {id}} = useRouteMatch();

    const {data, loading, error} = useQuery(GET_EMPLOYER, {variables: {id}});

    if (loading) {
        return <div className="alert alert-secondary">Загрузка...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">Ошибка!</div>;
    }

    if (!data) {
        return <div className="alert alert-warning">Не найдено</div>;
    }

    return (<div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

        <h2 className="border-bottom pb-sm-2 mb-sm-4">{data.getEmployer.last_name} {data.getEmployer.first_name} {data.getEmployer.middle_name}</h2>
        <div className="row">
            <div className="col-sm-4">
                <div className="mb-sm-1">Телефон</div>
                <div className="font-weight-bolder">{data.getEmployer.phone}</div>
            </div>

            {(data.getEmployer.type === EmployerRole.DOCTOR) && <>
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
                    <div className="font-weight-bolder">{data.getEmployer.directions.map(direction => direction.name).join(', ')}</div>
                </div>
            </>}
        </div>
    </div>);
}

export default View;

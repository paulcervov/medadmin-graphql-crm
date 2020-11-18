import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {Role as EmployerRole, RoleDescription as EmployerRoleDescription} from '../../../types/Employer/Role';
import {useRouteMatch} from "react-router-dom";

const GET_EMPLOYER = gql`
    query getEmployer($id: ID!) {
        getUser(id: $id) {
            id
            last_name
            first_name
            middle_name
            phone
            role_id
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

        <h2 className="border-bottom pb-sm-2 mb-sm-4">{data.getUser.last_name} {data.getUser.first_name} {data.getUser.middle_name}</h2>
        <div className="row">
            <div className="col-sm-4">
                <div className="mb-sm-1">Телефон</div>
                <div className="font-weight-bolder">{data.getUser.phone}</div>
            </div>

            {(data.getUser.role_id === EmployerRole.DOCTOR) && <>
                <div className="col-sm-4">
                    <div className="mb-sm-1 mt-sm-3">Процент от услуги</div>
                    <div className="font-weight-bolder">{data.getUser.percentage}</div>
                </div>
            </>}
        </div>

        <div className="row">

            <div className="col-sm-4">
                <div className="mb-sm-1 mt-sm-3">Роль</div>
                <div className="font-weight-bolder">{EmployerRoleDescription[data.getUser.role_id]}</div>
            </div>

            {(data.getUser.role_id === EmployerRole.DOCTOR) && <>
                <div className="col-sm-8">
                    <div className="mb-sm-1 mt-sm-3">Направления</div>
                    <div className="font-weight-bolder">{data.getUser.directions.map(direction => direction.name).join(', ')}</div>
                </div>
            </>}
        </div>
    </div>);
}

export default View;

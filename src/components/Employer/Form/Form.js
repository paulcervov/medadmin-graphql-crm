import React from 'react';
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

function Form({id}) {

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

        <h2 className="border-bottom pb-sm-2 mb-sm-4">{id ? 'Редактирование сотрудника' : 'Новый сотрудник'}</h2>
    </div>);
}

export default Form;

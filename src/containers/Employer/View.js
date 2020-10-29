import React from 'react';
import {gql, useQuery} from "@apollo/client";
import EmployerView from '../../components/Employer/View/View'

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

function Show({id}) {

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

    return <EmployerView employer={data.getEmployer}/>;
}

export default Show;

import React from 'react';
import {gql, useQuery} from "@apollo/client";
import {useRouteMatch} from "react-router-dom";
import EmployerView from '../../components/Employer/View/View'

const GET_EMPLOYER = gql`
    query getEmployer($id: ID!) {
        getEmployer(id: $id) {
            id
            lastName
            firstName
            middleName
            phone
            genderId
            dateOfBirth
            roleId
            percentage
            directions {
                name
            }
        }
    }
`;

function View() {

    const {params: {id}} = useRouteMatch();

    const {data: getEmployerData, loading: getEmployerLoading, error: getEmployerError} = useQuery(GET_EMPLOYER, {
        variables: {id},
    });

    return (<EmployerView
        getEmployerData={getEmployerData}
        loading={getEmployerLoading}
        error={getEmployerError}
    ></EmployerView>)
}

export default View;

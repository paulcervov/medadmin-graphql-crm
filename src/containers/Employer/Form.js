import React, {useState} from 'react';
import {gql, useMutation, useQuery} from "@apollo/client";
import EmployerForm from '../../components/Employer/Form/Form'
import {useRouteMatch} from "react-router-dom";

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
        }
    }
`;

const CREATE_EMPLOYER = gql`
    mutation CreateEmployer($input: EmployerInput!) {
        createEmployer(input: $input) {
            success
            message
            employer {
                id
                lastName
                firstName
                middleName
                phone
                genderId
                dateOfBirth
                roleId
                percentage
            }
        }
    }
`;

const UPDATE_EMPLOYER = gql`
    mutation UpdateEmployer($id: ID!, $input: EmployerInput!) {
        updateEmployer(id: $id, input: $input) {
            success
            message
            employer {
                id
                lastName
                firstName
                middleName
                phone
                genderId
                dateOfBirth
                roleId
                percentage
            }
        }
    }
`;

function Form() {

    const {params: {id}} = useRouteMatch();

    const [messages, setMessages] = useState([]);

    const {data: getEmployerData, loading: getEmployerLoading, error: getEmployerError} = useQuery(GET_EMPLOYER, {
        variables: {id},
        skip: !id
    });

    const [updateEmployer, {loading: updateEmployerLoading, error: updateEmployerError}] = useMutation(UPDATE_EMPLOYER, {variables: {id}});
    const [createEmployer, {loading: createEmployerLoading, error: createEmployerError}] = useMutation(CREATE_EMPLOYER);

    async function handleSubmit(values) {

        const mutation = id ? updateEmployer : createEmployer;

       const {data} = await mutation({
           variables: {
               id: id,
            input: values
           }
       });

       const success = id ? data?.updateEmployer?.success : data?.createEmployer?.success;
       const message = id ? data?.updateEmployer?.message : data?.createEmployer?.message;

        if (success) {
            setMessages([...messages, {text: message, type: 'success'}]);
        }
    }

    return (<EmployerForm
        getEmployerData={getEmployerData}
        loading={getEmployerLoading || createEmployerLoading || updateEmployerLoading}
        error={getEmployerError || createEmployerError || updateEmployerError}
        handleSubmit={handleSubmit}
        messages={messages}
    />)
}

export default Form;

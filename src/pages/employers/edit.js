import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerFormContainer from '../../components/Employer/Form/Container'

function Edit({match: {params: {id}}}) {
    return (
        <DashboardLayout>
            <div className="container">
                <EmployerFormContainer id={id}/>
            </div>
        </DashboardLayout>
    )
}

export default Edit;

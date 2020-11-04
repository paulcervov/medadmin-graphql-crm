import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerFormContainer from '../../components/Employer/Form/Container'

function Create() {
    return (
        <DashboardLayout>
            <div className="container">
                <EmployerFormContainer/>
            </div>
        </DashboardLayout>
    )
}

export default Create;

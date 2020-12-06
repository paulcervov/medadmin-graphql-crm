import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerForm from '../../containers/Employer/Form'

function Create() {
    return (
        <DashboardLayout>
            <div className="container">
                <EmployerForm/>
            </div>
        </DashboardLayout>
    )
}

export default Create;

import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerForm from '../../components/Employer/Form/Form'

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

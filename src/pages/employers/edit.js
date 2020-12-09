import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerForm from '../../containers/Employer/Form';

function Edit() {
    return (
        <DashboardLayout>
            <div className="container">
                <EmployerForm/>
            </div>
        </DashboardLayout>
    )
}

export default Edit;

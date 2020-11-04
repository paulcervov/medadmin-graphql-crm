import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerForm from '../../components/Employer/Form/Form';

function Edit({match: {params: {id}}}) {
    return (
        <DashboardLayout>
            <div className="container">
                <EmployerForm id={id}/>
            </div>
        </DashboardLayout>
    )
}

export default Edit;

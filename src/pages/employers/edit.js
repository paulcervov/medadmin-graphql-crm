import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerForm from '../../containers/Employer/Form';

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

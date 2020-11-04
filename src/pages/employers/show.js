import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerView from '../../components/Employer/View/View';

function Show({match: {params: {id}}}) {

    return (
        <DashboardLayout>
            <div className="container">
                <EmployerView id={id}/>
            </div>
        </DashboardLayout>
    )
}

export default Show;

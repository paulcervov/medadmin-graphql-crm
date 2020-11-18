import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerView from '../../components/Employer/View/View';

function Show() {

    return (
        <DashboardLayout>
            <div className="container">
                <EmployerView />
            </div>
        </DashboardLayout>
    )
}

export default Show;

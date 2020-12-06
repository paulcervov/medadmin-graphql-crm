import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerView from '../../containers/Employer/View';

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

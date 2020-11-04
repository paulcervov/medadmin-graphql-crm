import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerList from '../../components/Employer/List/List';

function Index() {

    return (
        <DashboardLayout>
            <div className="container">
                <EmployerList/>
            </div>
        </DashboardLayout>
    )
}

export default Index;

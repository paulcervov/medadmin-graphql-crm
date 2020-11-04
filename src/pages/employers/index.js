import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerListContainer from '../../components/Employer/List/Container';

function Index() {

    return (
        <DashboardLayout>
            <div className="container">
                <EmployerListContainer/>
            </div>
        </DashboardLayout>
    )
}

export default Index;

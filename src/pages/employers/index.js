import React from 'react';
import LayoutDashboard from "../../components/Layout/Dashboard";
import EmployerListContainer from '../../components/Employer/List/Container';

function Index() {

    return (
        <LayoutDashboard>
            <div className="container">
                <EmployerListContainer/>
            </div>
        </LayoutDashboard>
    )
}

export default Index;

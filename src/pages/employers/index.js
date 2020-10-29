import React from 'react';
import LayoutDashboard from "../../components/Layout/Dashboard";
import ContainersEmployerList from '../../containers/Employer/List';

function Index() {

    return (
        <LayoutDashboard>
            <div className="container">
                <ContainersEmployerList/>
            </div>
        </LayoutDashboard>
    )
}

export default Index;

import React from 'react';

import ComponentsLayoutDashboard from "../../components/Layout/Dashboard";
import ContainersEmployerList from '../../containers/Employer/List';

function Index() {

    return (
        <ComponentsLayoutDashboard>
            <div className="container">
                <ContainersEmployerList/>
            </div>
        </ComponentsLayoutDashboard>
    )
}

export default Index;

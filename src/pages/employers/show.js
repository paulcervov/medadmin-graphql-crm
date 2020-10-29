import React from 'react';
import ComponentsLayoutDashboard from "../../components/Layout/Dashboard";
import ContainersEmployerView from '../../containers/Employer/View';

function Show({match: {params: {id}}}) {

    return (
        <ComponentsLayoutDashboard>
            <div className="container">
                <ContainersEmployerView id={id}/>
            </div>
        </ComponentsLayoutDashboard>
    )
}

export default Show;

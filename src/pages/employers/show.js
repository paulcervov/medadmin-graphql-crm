import React from 'react';
import LayoutDashboard from "../../components/Layout/Dashboard";
import ContainersEmployerView from '../../containers/Employer/View';

function Show({match: {params: {id}}}) {

    return (
        <LayoutDashboard>
            <div className="container">
                <ContainersEmployerView id={id}/>
            </div>
        </LayoutDashboard>
    )
}

export default Show;

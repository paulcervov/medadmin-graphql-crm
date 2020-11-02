import React from 'react';
import LayoutDashboard from "../../components/Layout/Dashboard";
import EmployerViewContainer from '../../components/Employer/View/Container';

function Show({match: {params: {id}}}) {

    return (
        <LayoutDashboard>
            <div className="container">
                <EmployerViewContainer id={id}/>
            </div>
        </LayoutDashboard>
    )
}

export default Show;

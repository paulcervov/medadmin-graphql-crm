import React from 'react';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerViewContainer from '../../components/Employer/View/Container';

function Show({match: {params: {id}}}) {

    return (
        <DashboardLayout>
            <div className="container">
                <EmployerViewContainer id={id}/>
            </div>
        </DashboardLayout>
    )
}

export default Show;

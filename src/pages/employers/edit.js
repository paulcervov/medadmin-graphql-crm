import React from 'react';
import LayoutDashboard from "../../components/Layout/Dashboard";
import EmployerFormContainer from '../../components/Employer/Form/Container'

function Edit({match: {params: {id}}}) {
    return (
        <LayoutDashboard>
            <div className="container">
                <EmployerFormContainer id={id}/>
            </div>
        </LayoutDashboard>
    )
}

export default Edit;

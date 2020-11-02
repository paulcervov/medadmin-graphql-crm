import React from 'react';
import LayoutDashboard from "../../components/Layout/Dashboard";
import EmployerFormContainer from '../../components/Employer/Form/Container'

function Create() {
    return (
        <LayoutDashboard>
            <div className="container">
                <EmployerFormContainer/>
            </div>
        </LayoutDashboard>
    )
}

export default Create;

import React from "react";
import {Role as EmployerRole, RoleDescription as EmployerRoleDescription} from '../../../types/Employer/Role';

function View({employer}) {
    return (
        <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

            <h2 className="border-bottom pb-sm-2 mb-sm-4">{employer.last_name} {employer.first_name} {employer.middle_name}</h2>
            <div className="row">
                <div className="col-sm-4">
                    <div className="mb-sm-1">Телефон</div>
                    <div className="font-weight-bolder">{employer.phone}</div>
                </div>

                {(employer.type === EmployerRole.DOCTOR) && <>
                    <div className="col-sm-4">
                        <div className="mb-sm-1 mt-sm-3">Процент от услуги</div>
                        <div className="font-weight-bolder">{employer.percentage}</div>
                    </div>
                </>}
            </div>

            <div className="row">

                <div className="col-sm-4">
                    <div className="mb-sm-1 mt-sm-3">Роль</div>
                    <div className="font-weight-bolder">{EmployerRoleDescription[employer.type]}</div>
                </div>

                {(employer.type === EmployerRole.DOCTOR) && <>
                    <div className="col-sm-8">
                        <div className="mb-sm-1 mt-sm-3">Направления</div>
                        <div className="font-weight-bolder">{employer.directions.join(', ')}</div>
                    </div>
                </>}
            </div>
        </div>
    );
}

export default View;

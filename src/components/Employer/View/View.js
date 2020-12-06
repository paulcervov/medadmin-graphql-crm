import React from 'react';
import {ID_ROLE_DOCTOR, ROLES} from "../../../constants/Employer";


function View({getEmployerData, loading, error}) {

    return (<>
        {loading && <div className="alert alert-secondary">Загрузка...</div>}

        {error && <div className="alert alert-danger">Ошибка!</div>}

        {getEmployerData && <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

            <h2 className="border-bottom pb-sm-2 mb-sm-4">{getEmployerData.getEmployer.lastName} {getEmployerData.getEmployer.firstName} {getEmployerData.getEmployer.middleName}</h2>
            <div className="row">
                <div className="col-sm-4">
                    <div className="mb-sm-1">Телефон</div>
                    <div className="font-weight-bolder">{getEmployerData.getEmployer.phone}</div>
                </div>

                {(getEmployerData.getEmployer.roleId === ID_ROLE_DOCTOR) && <>
                    <div className="col-sm-4">
                        <div className="mb-sm-1 mt-sm-3">Процент от услуги</div>
                        <div className="font-weight-bolder">{getEmployerData.getEmployer.percentage}</div>
                    </div>
                </>}
            </div>

            <div className="row">

                <div className="col-sm-4">
                    <div className="mb-sm-1 mt-sm-3">Роль</div>
                    <div className="font-weight-bolder">{ROLES.get(getEmployerData.getEmployer.roleId)}</div>
                </div>

                {(getEmployerData.getEmployer.roleId === ID_ROLE_DOCTOR) && (getEmployerData.getEmployer.directions.length > 0) && <>
                    <div className="col-sm-8">
                        <div className="mb-sm-1 mt-sm-3">Направления</div>
                        <div
                            className="font-weight-bolder">{getEmployerData.getEmployer.directions.map(direction => direction.name).join(', ')}</div>
                    </div>
                </>}
            </div>
        </div>}
    </>);
}

export default View;

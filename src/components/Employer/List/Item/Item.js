import React from 'react';
import IconEdit from '../../../common/Icons/Edit';
import IconDelete from '../../../common/Icons/Delete';
import IconRestore from '../../../common/Icons/Restore';
import EmployerType from '../../../../enums/Employer/Type'
import {Link, useRouteMatch} from "react-router-dom";

function Item({employer}) {

    const {path} = useRouteMatch();

    return (
        <div className="bg-light">
            <div className="row p-2">

                <div className="col-sm-3">
                    <Link to={`/employers/${employer.id}`}>
                        {employer.last_name} {employer.first_name} {employer.middle_name}
                    </Link>
                    <div>{employer.phone}</div>
                </div>

                <div className="col-sm-7">
                    {(employer.type === EmployerType.DOCTOR) && (employer.directions.length) && (<div
                        className="font-weight-bold">{employer.directions.map(direction => direction.name).join(', ')}</div>)}
                    {(employer.type === EmployerType.DOCTOR) && <div>Процент от услуги: {employer.percentage}</div>}
                </div>

                <div className="col-sm-auto ml-sm-auto">

                    {employer.deleted_at && <button
                        className="btn btn-light"
                        title="Восстановить">
                        <IconRestore/>
                    </button>}

                    {!employer.deleted_at && <Link
                        className="btn btn-primary"
                        title="Редактировать"
                        to={`${path}/${employer.id}/edit`}
                    >
                        <IconEdit/>
                    </Link>}

                    {!employer.deleted_at && <button
                        className="btn btn-danger ml-sm-2"
                        title="Удалить">
                        <IconDelete/>
                    </button>}
                </div>
            </div>
        </div>
    );
}

export default Item;

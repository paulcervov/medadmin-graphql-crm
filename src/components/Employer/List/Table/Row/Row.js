import React from 'react';
import IconEdit from '../../../../common/Icons/Edit';
import IconDelete from '../../../../common/Icons/Delete';
import IconRestore from '../../../../common/Icons/Restore';
import {ID_ROLE_DOCTOR} from "../../../../../constants/Employer";
import {Link, useRouteMatch} from "react-router-dom";

function Row({employer, onClickDelete, onClickRestore}) {

    const {path} = useRouteMatch();

    return (
        <div className="row p-2">

            <div className="col-sm-3">
                <Link to={`/employers/${employer.id}`}>
                    {employer.lastName} {employer.firstName} {employer.middleName}
                </Link>
                <div>{employer.phone}</div>
            </div>

            <div className="col-sm-7">
                {(employer.roleId === ID_ROLE_DOCTOR) && (employer.directions.length > 0) && <>
                    <div
                        className="font-weight-bold">{employer.directions.map(direction => direction.name).join(', ')}</div>
                </>}
                {(employer.roleId === ID_ROLE_DOCTOR) && <div>Процент от услуги: {employer.percentage}</div>}
            </div>

            <div className="col-sm-auto ml-sm-auto">

                {employer.deletedAt && <button
                    data-id={employer.id}
                    onClick={onClickRestore}
                    className="btn btn-light"
                    title="Восстановить">
                    <IconRestore/>
                </button>}

                {!employer.deletedAt && <Link
                    className="btn btn-primary"
                    title="Редактировать"
                    to={`${path}/${employer.id}/edit`}
                >
                    <IconEdit/>
                </Link>}

                {!employer.deletedAt && <button
                    data-id={employer.id}
                    onClick={onClickDelete}
                    className="btn btn-danger ml-sm-2"
                    title="Удалить">
                    <IconDelete/>
                </button>}
            </div>
        </div>
    );
}

export default Row;

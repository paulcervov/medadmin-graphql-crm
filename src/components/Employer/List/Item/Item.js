import React from 'react';
import ButtonEdit from '../../../common/Button/Edit';
import ButtonDelete from '../../../common/Button/Delete';
import ButtonRestore from '../../../common/Button/Restore';
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
                    {(employer.type === EmployerType.DOCTOR) && (employer.directions.length) && (<div className="font-weight-bold">{employer.directions.map(direction => direction.name).join(', ')}</div>) }
                    {(employer.type === EmployerType.DOCTOR) && <div>Процент от услуги: {employer.percentage}</div>}
                </div>

                <div className="col-sm-auto ml-sm-auto">

                    {employer.deleted_at && <ButtonRestore url={`#`}/>}

                    {!employer.deleted_at && <ButtonEdit to={`${path}/${employer.id}/edit`}/>}

                    {!employer.deleted_at && <ButtonDelete url={`#`}/>}
                </div>
            </div>
        </div>
    );
}

export default Item;

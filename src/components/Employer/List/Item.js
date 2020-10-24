import React from 'react';
import EditButton from '../../UI/EditButton';
import DeleteButton from '../../UI/DeleteButton';
import RestoreButton from '../../UI/RestoreButton';
import EmployerType from '../../../enums/EmployerType'

function Item({employer}) {
    return (
        <div className="bg-light">
            <div className="row p-2">

                <div className="col-sm-3">
                    <a href="http://127.0.0.1:8000/employers/4" className="font-weight-bold">{employer.last_name} {employer.first_name} {employer.middle_name}</a>
                    <div>{employer.phone}</div>
                </div>

                <div className="col-sm-7">
                    {(employer.type === EmployerType.DOCTOR) && (employer.directions.length) && (<div className="font-weight-bold">{employer.directions.map(direction => direction.name).join(', ')}</div>) }
                    {(employer.type === EmployerType.DOCTOR) && <div>Процент от услуги: {employer.percentage}</div>}
                </div>

                <div className="col-sm-auto ml-sm-auto">

                    {employer.deleted_at && <RestoreButton url={`#`}/>}

                    {!employer.deleted_at && <EditButton url={`#`}/>}

                    {!employer.deleted_at && <DeleteButton url={`#`}/>}
                </div>
            </div>
        </div>
    );
}

export default Item;

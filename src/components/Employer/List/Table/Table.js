import React from 'react';
import EmployerTableRow from './Row/Row'

function Table({employers, onClickDelete, onClickRestore}) {
    return (
        <div className="border p-sm-2 mb-sm-3">
            {employers.map(employer => <EmployerTableRow employer={employer} onClickDelete={onClickDelete} onClickRestore={onClickRestore} key={employer.id}/>)}
        </div>
    );
}

export default Table;

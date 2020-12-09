import React from 'react';
import EmployerTableRow from './Row/Row'

function Table({employers, handleDelete, handleRestore}) {
    return (
        <div className="border p-sm-2 mb-sm-3">
            {employers.map(employer => <EmployerTableRow employer={employer} handleDelete={handleDelete} handleRestore={handleRestore} key={employer.id}/>)}
        </div>
    );
}

export default Table;

import React from 'react';
import EmployerListItem from './Item/Item'

function List({employers}) {
    return (
        <div className="border p-sm-2 mb-sm-3">
            {employers.map(employer => <EmployerListItem employer={employer} key={employer.id}/>)}
        </div>
    );
}

export default List;

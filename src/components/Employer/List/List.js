import React from 'react';
import ListItem from './Item/Item'

function List({employers}) {
    return (
        <div className="border p-sm-2 mb-sm-3">
            {employers.map(employer => <ListItem employer={employer} key={employer.id}/>)}
        </div>
    );
}

export default List;

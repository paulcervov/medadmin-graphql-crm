import React from 'react';
import ListItem from './Item/Item'

function List({employers, canLoadMore, onClickLoadMore}) {
    return (
        <>
            <div className="border p-sm-2 mb-sm-3">
                {employers.map(employer => <ListItem employer={employer} key={employer.id}/>)}
            </div>
            <button className="btn btn-primary" onClick={onClickLoadMore} disabled={!canLoadMore}>Загрузить еще</button>
        </>
    );
}

export default List;

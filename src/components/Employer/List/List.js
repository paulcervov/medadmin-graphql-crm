import React from 'react';
import Item from './Item'

function List({employers, canLoadMore, onClickLoadMore}) {
    return (
        <>
            <div className="border p-sm-2 mb-sm-3">
                {employers.map(employer => <Item employer={employer} key={employer.id}/>)}
            </div>
            <button className="btn btn-primary" onClick={onClickLoadMore} disabled={!canLoadMore}>Загрузить еще</button>
        </>
    );
}

export default List;

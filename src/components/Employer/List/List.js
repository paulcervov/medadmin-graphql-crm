import React from 'react';
import {Link} from "react-router-dom";
import EmployerTable from "../Table/Table";

function List({employers, onClickLoadMore, canClickLoadMore}) {
    return <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

            <h2 className="border-bottom pb-sm-2 mb-sm-4">Список сотрудников</h2>

            <div className="row mb-sm-3">

                <div className="col-sm-auto"></div>

                <div className="col-sm-auto ml-sm-auto">
                    <Link className="btn btn-primary" to="/employers/create">Новый сотрудник</Link>
                </div>
            </div>

            <EmployerTable employers={employers} />

            <button className="btn btn-primary"
                             onClick={onClickLoadMore}
                             disabled={!canClickLoadMore}
            >Загрузить еще</button>
        </div>;
}

export default List;

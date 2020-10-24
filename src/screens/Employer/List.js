import React from 'react';

import EmployerListContainer from "../../components/Employer/List/Container";

function List() {
    return (
        <div className="container">
            <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

                <h2 className="border-bottom pb-sm-2 mb-sm-4">Список сотрудников</h2>

                <div className="row mb-sm-3">

                    <div className="col-sm-auto">

                    </div>

                    <div className="col-sm-auto ml-sm-auto">
                        <a className="btn btn-primary" href="#">Новый сотрудник</a>
                    </div>
                </div>

                <EmployerListContainer />
            </div>

        </div>
    )
}

export default List;

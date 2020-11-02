import React from "react";

function Form({employer}) {
    return (
        <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

            <h2 className="border-bottom pb-sm-2 mb-sm-4">{employer ? 'Редактирование сотрудника' : 'Новый сотрудник'}</h2>
        </div>
    );
}

export default Form;

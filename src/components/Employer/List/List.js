import React from 'react';
import EmployerTable from "./Table/Table";
import {Link} from "react-router-dom";

function List({
                  messages,
                  loading,
                  error,
                  findEmployersData,
                  onChangeOrderBy,
                  orderBySelect,
                  orderByOptions,
                  onInputSearchQuery,
                  searchQuery,
                  handleLoadMore,
                  handleDelete,
                  handleRestore,
              }) {

    return (<>

        <div className="border pl-sm-4 pr-sm-4 pb-sm-3 pt-sm-3">

            <h2 className="border-bottom pb-sm-2 mb-sm-4">Список сотрудников</h2>

            <div className="row mb-sm-3">

                <div className="col-sm-2">
                    <select className="form-control" onChange={onChangeOrderBy} ref={orderBySelect}>
                        {Object.keys(orderByOptions).map(value => <option value={value} key={value}>{value}</option>)}
                    </select>
                </div>

                <div className="col-sm-4">
                    <input
                        className="form-control"
                        placeholder="Введите текст"
                        autoComplete="off"
                        onInput={onInputSearchQuery}
                        value={searchQuery}
                    />
                </div>

                <div className="col-sm-auto ml-sm-auto">
                    <Link className="btn btn-primary" to="/employers/create">Новый сотрудник</Link>
                </div>
            </div>

            {!!messages.length && messages.map((message, index) => <div
                    key={index}
                    className={`alert alert-${message.type} alert-dismissible fade show`}
                >
                    {message.text}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}

            {loading && <div className="alert alert-secondary">Загрузка...</div>}

            {error && <div className="alert alert-danger">Ошибка!</div>}

            {!loading && !error && !findEmployersData?.findEmployers?.data?.length &&
            <div className="alert alert-warning">Не найдено</div>}

            {!!findEmployersData?.findEmployers?.data?.length && <>

                <EmployerTable employers={findEmployersData.findEmployers.data}
                               handleDelete={handleDelete}
                               handleRestore={handleRestore}
                />

                <button className="btn btn-primary"
                        onClick={handleLoadMore}
                        disabled={!findEmployersData.findEmployers.hasMorePages}
                >Загрузить еще
                </button>

            </>}

        </div>
    </>);
}

export default List;

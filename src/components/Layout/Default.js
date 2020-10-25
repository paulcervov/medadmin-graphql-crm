import React from 'react';
import {Link} from 'react-router-dom';

function Default({children}) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">

                    <Link className="navbar-brand" to="/">{process.env.REACT_APP_NAME}</Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {/* Left Side Of Navbar */}
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item ">
                                <Link className="nav-link" to="clinic">Клиника</Link>
                            </li>

                            <li className="nav-item ">
                                <Link className="nav-link" to="/employers">Сотрудники</Link>
                            </li>

                        </ul>

                    </div>
                </div>
            </nav>

            <main className="py-4">
                {children}
            </main>
        </>
    );
}

export default Default;

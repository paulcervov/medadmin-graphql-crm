import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import LayoutApp from '../Layout/App';

function Dashboard({children}) {
    return (
        <LayoutApp>
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
                        <div className="navbar-nav mr-auto">
                            <NavLink className="nav-item nav-link" to="/clinic">Клиника</NavLink>
                            <NavLink className="nav-item nav-link" to="/employers">Сотрудники</NavLink>
                        </div>

                    </div>
                </div>
            </nav>

            <main className="py-4">
                {children}
            </main>
        </LayoutApp>
    );
}

export default Dashboard;

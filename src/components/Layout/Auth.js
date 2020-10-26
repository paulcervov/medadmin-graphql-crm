import React from 'react';
import {Link} from 'react-router-dom';
import LayoutApp from '../Layout/App';

function Auth({children}) {
    return (
        <LayoutApp>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">

                    <Link className="navbar-brand" to="/">{process.env.REACT_APP_NAME}</Link>

                </div>
            </nav>

            <main className="py-4">
                {children}
            </main>
        </LayoutApp>
    );
}

export default Auth;

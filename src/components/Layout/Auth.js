import React from 'react';
import {Link} from 'react-router-dom';
import AppLayout from '../Layout/App';

function Auth({children}) {
    return (
        <AppLayout>
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
                <div className="container">

                    <Link className="navbar-brand" to="/">{process.env.REACT_APP_NAME}</Link>

                </div>
            </nav>

            <main className="py-4">
                {children}
            </main>
        </AppLayout>
    );
}

export default Auth;

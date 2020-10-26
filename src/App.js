import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Index from "./pages/index";
import ClinicIndex from "./pages/clinic/index";
import EmployersIndex from "./pages/employers/index";
import EmployersCreate from "./pages/employers/create";
import EmployersShow from "./pages/employers/show";
import Login from "./pages/login";

function App() {
    return (
        <Router>
            <Switch>

                <Route exact path="/" component={Index} />

                <Route path="/clinic" component={ClinicIndex} />

                <Route
                    path="/employers"
                    render={({ match: { path } }) => (
                        <>
                            <Route exact path={`${path}/`} component={EmployersIndex} />
                            <Route path={`${path}/create`} component={EmployersCreate} />
                            <Route path={`${path}/:id(\\d+)`} component={EmployersShow} />
                        </>
                    )}
                />

                <Route path="/login" component={Login} />

            </Switch>
        </Router>
    );
}

export default App;

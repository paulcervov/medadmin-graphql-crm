import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Index from "./pages/index";
import ClinicIndex from "./pages/clinic/index";
import EmployersIndex from "./pages/employers/index";
import EmployersCreate from "./pages/employers/create";
import EmployersShow from "./pages/employers/show";
import EmployersEdit from "./pages/employers/edit";
import Login from "./pages/login";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route path="/clinic" component={ClinicIndex} />
                <Route
                    path="/employers"
                    render={({ match: { path } }) => (
                        <>
                            <Route exact path={`${path}`} component={EmployersIndex} />
                            <Route exact path={`${path}/create`} component={EmployersCreate} />
                            <Route exact path={`${path}/:id(\\d+)`} component={EmployersShow} />
                            <Route exact path={`${path}/:id(\\d+)/edit`} component={EmployersEdit} />
                        </>
                    )}
                />
                <Route path="/login" component={Login} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

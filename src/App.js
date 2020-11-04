import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import IndexPage from "./pages/index";
import ClinicIndexPage from "./pages/clinic/index";
import PagesEmployersIndex from "./pages/employers/index";
import EmployersCreatePage from "./pages/employers/create";
import EmployersShowPage from "./pages/employers/show";
import EmployersEditPage from "./pages/employers/edit";
import LoginPage from "./pages/login";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route path="/clinic" component={ClinicIndexPage} />
                <Route
                    path="/employers"
                    render={({ match: { path } }) => (
                        <>
                            <Route exact path={`${path}`} component={PagesEmployersIndex} />
                            <Route exact path={`${path}/create`} component={EmployersCreatePage} />
                            <Route exact path={`${path}/:id(\\d+)`} component={EmployersShowPage} />
                            <Route exact path={`${path}/:id(\\d+)/edit`} component={EmployersEditPage} />
                        </>
                    )}
                />
                <Route path="/login" component={LoginPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

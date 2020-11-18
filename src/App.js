import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import IndexPage from "./pages/index";
import ClinicIndexPage from "./pages/clinic/index";
import EmployersIndexPage from "./pages/employers/index";
import LoginPage from "./pages/login";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={IndexPage} />
                <Route path="/clinic" component={ClinicIndexPage} />
                <Route path="/employers" component={EmployersIndexPage}/>
                <Route path="/login" component={LoginPage} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

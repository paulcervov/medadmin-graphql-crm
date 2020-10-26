import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Index from "./pages/index";
import ClinicIndex from "./pages/clinic/index";
import EmployersIndex from "./pages/employers/index";
import Login from "./pages/login";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Index/>
                </Route>
                <Route path="/clinic">
                    <ClinicIndex/>
                </Route>
                <Route path="/employers">
                    <EmployersIndex/>
                </Route>
                <Route path="/login">
                    <Login/>
                </Route>
            </Switch>
        </Router>
    );
}

export default App;

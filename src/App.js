import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PagesIndex from "./pages/index";
import PagesClinicIndex from "./pages/clinic/index";
import PagesEmployersIndex from "./pages/employers/index";
import PagesEmployersCreate from "./pages/employers/create";
import PagesEmployersShow from "./pages/employers/show";
import PagesEmployersEdit from "./pages/employers/edit";
import PagesLogin from "./pages/login";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={PagesIndex} />
                <Route path="/clinic" component={PagesClinicIndex} />
                <Route
                    path="/employers"
                    render={({ match: { path } }) => (
                        <>
                            <Route exact path={`${path}`} component={PagesEmployersIndex} />
                            <Route exact path={`${path}/create`} component={PagesEmployersCreate} />
                            <Route exact path={`${path}/:id(\\d+)`} component={PagesEmployersShow} />
                            <Route exact path={`${path}/:id(\\d+)/edit`} component={PagesEmployersEdit} />
                        </>
                    )}
                />
                <Route path="/login" component={PagesLogin} />
            </Switch>
        </BrowserRouter>
    );
}

export default App;

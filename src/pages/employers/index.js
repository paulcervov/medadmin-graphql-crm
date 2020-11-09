import React from 'react';
import {Route, Switch, useRouteMatch} from 'react-router-dom';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerList from '../../components/Employer/List/List';
import CreatePage from "./create";
import ShowPage from "./show";
import EditPage from "./edit";

function Index() {

    const {path} = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${path}`}>
                <DashboardLayout>
                    <div className="container">
                        <EmployerList/>
                    </div>
                </DashboardLayout>
            </Route>
            <Route exact path={`${path}/create`} component={CreatePage}/>
            <Route exact path={`${path}/:id(\\d+)`} component={ShowPage}/>
            <Route exact path={`${path}/:id(\\d+)/edit`} component={EditPage}/>
        </Switch>
    )
}

export default Index;

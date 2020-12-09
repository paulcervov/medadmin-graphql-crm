import React from 'react';
import {Route, Routes} from 'react-router-dom';
import DashboardLayout from "../../components/Layout/Dashboard";
import EmployerList from '../../containers/Employer/List';
import CreatePage from "./create";
import ShowPage from "./show";
import EditPage from "./edit";

function Index() {

    return (
        <Routes>
            <Route path="/">
                <DashboardLayout>
                    <div className="container">
                        <EmployerList/>
                    </div>
                </DashboardLayout>
            </Route>
            <Route path="create" element={<CreatePage/>}/>
            <Route path=":id" element={<ShowPage/>}/>
            <Route path=":id/edit" element={<EditPage/>}/>
        </Routes>
    )
}

export default Index;

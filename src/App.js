import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import IndexPage from "./pages/index";
import ClinicIndexPage from "./pages/clinic/index";
import EmployersIndexPage from "./pages/employers/index";
import LoginPage from "./pages/login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<IndexPage/>} />
                <Route path="/clinic" element={<ClinicIndexPage/>} />
                <Route path="/employers/*" element={<EmployersIndexPage/>}/>
                <Route path="/login" element={<LoginPage/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

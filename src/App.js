import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import NavBar from "./components/Navbar";
import ScreensView from "./screens/View";
import ScreensClinicView from "./screens/Clinic/View";
import ScreensEmployerList from "./screens/Employer/List";

function App() {
    return (
        <Router>

            <NavBar/>

            <main className="py-4">
                <Switch>
                    <Route exact path="/">
                        <ScreensView/>
                    </Route>
                    <Route path="/clinic">
                        <ScreensClinicView/>
                    </Route>
                    <Route path="/employers">
                        <ScreensEmployerList/>
                    </Route>
                </Switch>
            </main>
        </Router>
    );
}

export default App;

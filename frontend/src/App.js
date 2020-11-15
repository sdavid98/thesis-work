import React, {useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {get} from 'idb-keyval';
import './App.css'
import Edit from "./components/Project/Edit/Edit";
import List from "./components/Project/List/List";
import LoginTabs from "./components/Login/LoginTabs/LoginTabs";
import ProtectedRoute from "./hoc/ProtectedRoute";
import {useDispatch, useSelector} from "react-redux";
import {isTokenValid} from "./utils/auth";
import {login} from "./actions";
import View from "./components/Project/View/View";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        get('user').then(user => {
            if (user && isTokenValid(user)) {
                dispatch(login(user.name, user.group));
            }
        }).catch(err => console.log(err));
    }, [dispatch]);

    const user = useSelector(state => state.user);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <LoginTabs/>
                    </Route>
                    <Route path="/logout">
                        <LoginTabs/>
                    </Route>
                    <Route path={"/projects/view/:viewId"}><View/></Route>
                    <ProtectedRoute user={user.isLoggedIn} path="/projects/new" component={Edit}/>
                    <ProtectedRoute user={user.isLoggedIn} path="/projects/:projectId" component={Edit}/>
                    <ProtectedRoute user={user.isLoggedIn} path="/projects" component={List}/>
                    <ProtectedRoute user={user.isLoggedIn} path="/" component={List}/>
                </Switch>
            </div>
        </Router>
    );
};

export default App;

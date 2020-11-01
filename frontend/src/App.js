import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";
import './App.css'
import Edit from "./components/Project/Edit/Edit";
import List from "./components/Project/List/List";
import LoginTabs from "./components/Login/LoginTabs/LoginTabs";
import ProtectedRoute from "./hoc/ProtectedRoute";
import {useSelector} from "react-redux";

const App = () => {
	const user = useSelector(state => state.user);

	return (
		<Router>
			<div>
				<Switch>
					<Route path="/login">
						<LoginTabs />
					</Route>
					<Route path="/logout">
						<LoginTabs />
					</Route>
					<ProtectedRoute user={user.isLoggedIn} path="/projects/new">
						<Edit />
					</ProtectedRoute>
					<ProtectedRoute user={user.isLoggedIn} path="projects/:projectId">
						<Edit />
					</ProtectedRoute>
					<ProtectedRoute user={user.isLoggedIn} path="/projects">
						<List />
					</ProtectedRoute>
					<ProtectedRoute user={user.isLoggedIn} path="/">
						<List />
					</ProtectedRoute>
				</Switch>
			</div>
		</Router>
	);
};

export default App;

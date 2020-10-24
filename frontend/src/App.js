import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from "react-router-dom";
import './App.css'
import Edit from "./components/Project/Edit/Edit";
import List from "./components/Project/List/List";
import LoginTabs from "./components/Login/LoginTabs/LoginTabs";

const App = () => {
	return (
		<Router>
			<div>
				<nav>
					<ul>
						<li>
							<Link to="/edit">Edit</Link>
						</li>
					</ul>
				</nav>

				<Switch>
					<Route path="/projects/new">
						<Edit />
					</Route>
					<Route path="projects/:projectId">
						<Edit />
					</Route>
					<Route path="/login">
						<LoginTabs />
					</Route>
					<Route path="/">
						<List />
					</Route>
				</Switch>
			</div>
		</Router>
	);
};

export default App;

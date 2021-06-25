import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import Account from "./components/pages/Account";
import Events from "./components/pages/Events";
import Event from "./components/pages/Event";
import Form from "./components/pages/Form";
import Redirect from "./components/pages/Redirect";
import CreateEvent from "./components/pages/CreateEvent";
import Analytics from './components/pages/Analytics';
import Log from './components/pages/Log';
import Signup from './components/pages/Signup';

import "./App.css";

class App extends Component {

	state	=	{
		accountId: 0
	}

	set_id = (id) => {
		this.setState({
			accountId: id
		});
		this.setupChild(id);
	}

	logout = () => {
		this.setState({
			accountId: 0
		});
	}

	render (){
		return (
			<Router>
				<div className="App">
					<div className="container">
						<Header
							id={this.state.accountId}
							call={setup => this.setupChild = setup}
						/>

						<Route exact={true} path="/" component={Homepage} />

						<Route exact={true} path="/about" component={About} />

						<Route exact={true} path="/contact" component={Contact} />

						<Route exact={true} path="/login">
							<Login set_id={this.set_id} />
						</Route>

						<Route exact={true} path="/account">
							<Account
							id={this.state.accountId}
							logout={this.logout}
							/>
						</Route>

						<Route exact={true} path="/events">
							<Events
							accountId={this.accoundId}
							/>
						</Route>

						<Route exact={true} path="/event">
							<Event
							accountId={this.accoundId}
							/>
						</Route>

						<Route exact={true} path="/form">
							<Form accoundId={this.state.accountId} />
						</Route>

						<Route exact={true} path="/redirect" component={Redirect} />

						<Route exact={true} path="/createEvent">
							<CreateEvent accountId={this.state.accountId} />
						</Route>

						<Route exact={true} path="/analytics" >
							<Analytics/>
						</Route>

						<Route exact={true} path="/log" >
							<Log/>
						</Route>

						<Route exact={true} path="/signup" component={Signup} />

						<Footer />
					</div>
				</div>
			</Router>
		);};
}

export default App;

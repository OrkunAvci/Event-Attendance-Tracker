import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import Account from "./components/pages/Account";
import Events from "./components/pages/Events";
import Form from "./components/pages/Form";
import Redirect from "./components/pages/Redirect";
import CreateForm from './components/CreateForm';
import Signup from './components/pages/Signup';

import "./App.css";

class App extends Component {

	state	=	{
		accountId: null
	}

	set_id = (id) => {
		this.setState({
			accountId: id
		});
	}

	render (){
		return (
			<Router>
				<div className="App">
					<div className="container">
						<Header logState={this.state.accountId !== null ? true : false} />

						<Route exact={true} path="/" component={Homepage} />

						<Route exact={true} path="/about" component={About} />

						<Route exact={true} path="/contact" component={Contact} />

						<Route exact={true} path="/login">
							<Login set_id={this.set_id} />
						</Route>

						<Route exact={true} path="/account">
							<Account id={this.state.accountId} />
						</Route>

						<Route exact={true} path="/events" component={Events} />

						<Route exact={true} path="/form" component={Form} />

						<Route exact={true} path="/redirect" component={Redirect} />

						<Route exact={true} path="/createEvent" component={CreateForm} />

						<Route exact={true} path="/signup" component={Signup} />

						<Footer />
					</div>
				</div>
			</Router>
		);};
}

export default App;

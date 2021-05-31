import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./components/pages/Homepage";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import Account from "./components/pages/Account";
import Event from "./components/pages/Event";
import Form from "./components/pages/Form";
import Redirect from "./components/pages/Redirect";
import CreateForm from './components/CreateForm';
import Signup from './components/pages/Signup';

import "./App.css";

class App extends Component {

	state	=	{
		accountId: null
	}

	//	Login functions:
	login_request = (id) => {
		this.setState({
			accountId: id
		});
	}

	render (){
		return(
			<Router>
				<div className = "App">
					<div className = "container">
						<Header 
							logState={(this.state.accountId !== null)}
						/>

						<Route
							exact={true}
							path = "/"
							component = {Homepage}

						/>

						<Route
							exact={true}
							path = "/about"
							component = {About}
						
						/>
						
						<Route
							exact={true}
							path = "/contact"
							component = {Contact}
						
						/>
						
						<Route
							exact={true}
							path = "/login"
							component = {Login}
							login_request = {this.login_request}

						/>
						
						<Route
							exact={true}
							path = "/account"
							component = {Account}
							props = {
								this.state.accountId
							}
							
						/>

						<Route
							exact={true}
							path = "/event"
							component = {Event}
						
						/>
						
						<Route
							exact={true}
							path = "/form"
							component = {Form}
						
						/>
						
						<Route
							exact={true}
							path = "/redirect"
							component = {Redirect}
						
						/>

						<Route
							exact={true}
							path = "/createEvent"
							component = {CreateForm}
						
						/>

						<Route
							exact={true}
							path = "/signup"
							component = {Signup}
						
						/>
						
						<Footer />
					</div>
				</div>
		</Router>
		)};
}

export default App;

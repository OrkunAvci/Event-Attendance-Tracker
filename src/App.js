import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Homepage from "./components/layout/Homepage";
import About from "./components/layout/About";
import Contact from "./components/layout/Contact";
import Login from "./components/layout/Login";
import Account from "./components/layout/Account";
import Form from "./components/layout/Form";
import Redirect from "./components/layout/Redirect";
import CreateForm from './components/CreateForm';
import Signup from './components/layout/Signup';

import "./App.css";

class App extends Component {

	state	=	{
		account: null
	}

	//	Login functions:
	set_account = (input) => {
		this.setState({
			account:input
		});
	}

	render (){
		return(
			<Router>
				<div className = "App">
					<div className = "container">
						<Header />

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
							path = "/createForm"
							component = {CreateForm}
						
						/>

						<Route
							exact={true}
							path = "/Signup"
							component = {Signup}
						
						/>
						
						<Footer />
					</div>
				</div>
		</Router>
		)};
}

export default App;

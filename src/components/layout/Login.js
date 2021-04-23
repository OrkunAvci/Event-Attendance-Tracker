import React, { Component } from 'react'
//import PropTypes from 'prop-types';
import axios from 'axios';

//import Account from "./Account";

export class Login extends Component {
	
	state = {
		email: "",
		password: ""
	}

	login_request = (e) => {
		e.preventDefault();
		
		//	Make request to backend to get account
		axios.post("Link To Backend", {
			email: this.email,
			password: this.password
		})
		.then(res => {
			console.log("Here");
			this.props.set_account(res.data);
		})
		.catch(res => {
			console.log(e);
		})
	};

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };
	
	render() {
		return (
			<div style={containerStyle}>
				<h2 style={headingStyle}>Enter your credentials</h2>
				<form onSubmit={this.login_request}>
					<label style={labeStyle}>Email</label>
					<input style={inputStyle} type="email" name="email" onChange={this.update_fields} />
				
					<label style={labeStyle}>Password</label>
					<input style={inputStyle} type="password" name="password" onChange={this.update_fields} />
				
					<button style={buttonStyle} type="submit" onSubmit={this.login_request}>Login to your account</button>
				</form>
			</div>
		)
	}
}

//	Props:


//	CSS Styling:
const containerStyle = {
	height: "auto",
	width: "500px",
	margin: "auto",
	padding: "40px 70px",
	boxSizing: "border-box",
	display: "inline-block",
	position: "relative",
	marginTop: "150px",
	background: "linear-gradient(45deg, rgba(0, 217, 255, 0.436) 0%, rgb(48, 48, 48, 0.79) 20%, rgba(48, 48, 48, 0.79) 80%, rgba(153, 0, 255, 0.5) 100%)",
	borderRadius: "48px",
}

const headingStyle = {
	color: "rgba(255, 253, 228, 0.95)",
	marginBottom: "40px",
	marginTop: "10px"
}

const labeStyle = {
	display : "block",
	color: "rgba(255, 253, 228, 0.9)",
	textAlign: "left"
}

const inputStyle = {
	display : "block",
	marginTop: "4px",
	marginBottom: "16px",
	borderRadius: "6px",
	border: "0",
	width: "100%",
	height: "20px",
	padding: "0px 5px"
}

const buttonStyle = {
	padding: "5px 15px",
	borderRadius: "6px",
	border: "0",
	marginTop: "40px",
	marginBottom: "20px",
	position: "relative",
	left: "auto"
}

export default Login

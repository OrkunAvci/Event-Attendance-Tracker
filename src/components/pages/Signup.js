import axios from 'axios';
import React from 'react'
import { Link, Redirect } from "react-router-dom";

export class Signup extends React.Component {
	state = {
		email: "",
		name: "",
		surname: "",
		password: "",
	};

	signup_request = (e) => {
		e.preventDefault();
		console.log("Got here.");
		axios
			.post(
				"user/signUp",
				{
					email: this.state.email,
					name: this.state.name,
					surname: this.state.surname,
					password: this.state.password,
				}
			)
			.then((res) => {
				console.log(res.data);
				if (!(res.data === undefined || res.data === null)) {
					return <Redirect to="http://localhost:3000/login" />;
				} else {
					console.log("Something went wrong. Debug this.");
				}
			});
	};

	update_fields = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render = () => {
		return (
			<div style={containerStyle}>
				<h2 style={headingStyle}>Enter your credentials</h2>
				<form>
					<label style={labeStyle}>Email</label>
					<input
						style={inputStyle}
						type="email"
						name="email"
						onChange={this.update_fields}
					/>

					<label style={labeStyle}>Name</label>
					<input
						style={inputStyle}
						type="text"
						name="name"
						onChange={this.update_fields}
					/>

					<label style={labeStyle}>Surname</label>
					<input
						style={inputStyle}
						type="text"
						name="surname"
						onChange={this.update_fields}
					/>

					<label style={labeStyle}>Password</label>
					<input
						style={inputStyle}
						type="password"
						name="password"
						onChange={this.update_fields}
					/>

					<Link style={linkStyle} to="/login">
						Already have an account? Login here.
					</Link>

					<button
						style={buttonStyle}
						type="submit"
						onClick={this.signup_request}
					>
						Sign up now!
					</button>
				</form>
			</div>
		);
	};
}

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
	background: "linear-gradient(45deg, rgba(0, 217, 255, 0.436) 0%, rgb(48, 48, 48, 0.79) 15%, rgba(48, 48, 48, 0.79) 85%, rgba(153, 0, 255, 0.5) 100%)",
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

const linkStyle = {
	color: "#bbb",
	textDecoration: "none",
	fontSize: "0.9rem",
	position: "relative",
	float: "right"
}

const buttonStyle = {
	padding: "5px 15px",
	borderRadius: "6px",
	border: "0",
	marginTop: "40px",
	marginBottom: "20px",
	position: "relative",
	left: "30%"
}

export default Signup;
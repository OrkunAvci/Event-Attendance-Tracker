import axios from 'axios';
import React, { Component } from 'react';
import query from "query-string";

export class Redirect extends Component {

	state = {
		id: null,
		redirection: "",
		email: "",
		code: "",
		output: ""
	}

	componentDidMount() {
		if (!(this.state.id === null || this.state.id === undefined)) {return;}

		let values = query.parse(this.props.location.search);
		this.setState({
			id: values.id
		});

		axios
			.get(`/event/getEventById?id=${values.id}`)
			.then((res) => {
				this.setState({
					redirection: res.data.eventUrl
				});
			})
			.catch(console.error);
	}

	submit_code = (e) => {
		e.preventDefault();

		axios
			.get(
				`registration/verifyCode?email=${this.state.email}&eventId=${this.state.id}&code=${this.state.code}`
			)
			.then((res) => {
				window.open(this.state.redirection, "_blank");
				this.setState({
					output: "Event link has been opened in a new tab. Enjoy!",
				});
			})
			.catch((err) => {
				this.setState({
					output: "Code could not be verified. Please check your code.",
				});
				console.error(err);
			});
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	render() {
		return (
			<div style={containerStyle}>
				<h2 style={headingStyle}>Enter your Code</h2>
				<form onSubmit={this.login_request}>
					<label style={labeStyle}>Email</label>
					<input style={inputStyle} type="email" name="email" onChange={this.update_fields} />
				
					<label style={labeStyle}>Code</label>
					<input style={inputStyle} type="text" name="code" onChange={this.update_fields} />

					<div style={outputStyle} id="codeField">{this.state.output}</div>
				
					<button style={buttonStyle} type="submit" onClick={this.submit_code}>Enter the event</button>
				</form>
			</div>
		)
	}
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
	background: "linear-gradient(45deg, rgba(0, 217, 255, 0.436) 0%, rgb(48, 48, 48, 0.79) 20%, rgba(48, 48, 48, 0.79) 80%, rgba(153, 0, 255, 0.5) 100%)",
	borderRadius: "48px",
}

const headingStyle = {
	color: "rgba(255, 253, 228, 0.9)",
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

const outputStyle = {
	display : "block",
	color: "rgba(255, 103, 108, 1)",
	textAlign: "middle"
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

export default Redirect

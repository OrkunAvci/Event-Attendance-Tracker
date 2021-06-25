import React, { Component } from 'react'

export class Contact extends Component {

	state = {
		email: "",
		description: ""
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	render() {
		return (
			<div style={containerStyle}>
				<h2 style={headingStyle}>Contact Us</h2>
				<form onSubmit={this.login_request}>
					<label style={labeStyle}>Email</label>
					<input style={inputStyle} type="email" name="email" onChange={this.update_fields} />
				
					<label style={labeStyle}>Say hi!</label>
					<textarea style={textareaStyle} name="description" onChange={this.update_fields} maxLength="1024" />
				
					<button style={buttonStyle} type="submit">Send</button>
				</form>
			</div>
		)
	}
}

//	CSS Styling:
const containerStyle = {
	height: "auto",
	width: "700px",
	margin: "auto",
	padding: "40px 70px",
	boxSizing: "border-box",
	display: "inline-block",
	position: "relative",
	marginTop: "150px",
	background: "linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 15%, rgba(48, 48, 48, 0.79) 85%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px"
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
	width: "70%",
	height: "20px",
	padding: "0px 5px"
}

const textareaStyle = {
	display : "block",
	marginTop: "4px",
	marginBottom: "16px",
	borderRadius: "8px",
	border: "0",
	width: "100%",
	height: "150px",
	padding: "0px 5px",
	resize: "none"
}

const buttonStyle = {
	padding: "5px 15px",
	borderRadius: "6px",
	border: "0",
	height: "30px",
	width: "150px",
	textAlign: "center",
	marginTop: "40px",
	marginBottom: "20px",
	position: "relative",
	left: "auto",
}

export default Contact

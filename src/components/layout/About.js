import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export class About extends Component {
	render() {
		return (
			<div style={containerStyle}>
				<h2 style={headingStyle}>About Us</h2>
				<p style={paraStyle}>This site has been built within the scope of a midpoint thesis by two developers.</p>
				<p style={paraStyle}>The frontend has been actualized with React and backend with Spring Boot.</p>
				<p style={paraStyle}>The research behind the work and the documentation of the project can be found in <Link exact={true} to="/documentation" style={linkStyle}>here.</Link></p>
			</div>
		)
	}
}

//	CSS Styling:
const containerStyle = {
	height: "auto",
	width: "1000px",
	margin: "auto",
	padding: "40px 70px",
	boxSizing: "border-box",
	display: "inline-block",
	position: "relative",
	marginTop: "150px",
	background: "linear-gradient(135deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.84) 13%, rgba(48, 48, 48, 0.84) 88%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
}

const headingStyle = {
	color: "rgba(255, 253, 228, 0.9)",
	marginBottom: "40px",
	marginTop: "10px"
}

const paraStyle = {
	textAlign: "left",
	color: "white",
	margin: "10px 20px"
}

const linkStyle = {
	textDecoration: "underline",
	color: "rgba(248, 248, 224, 0.8)"
}

export default About

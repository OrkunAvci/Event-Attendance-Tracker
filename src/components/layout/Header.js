import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export class Header extends React.Component {

	state = {
		id: this.props.id,
		accountLink: `/account?id=${this.props.id}`
	}

	shouldComponentUpdate(newProps){
		return newProps.id !== this.state.id;
	}

	render () {
		return (
			<header style={headerStyle}>
	  			<Link to="/"><h2 style={brandStyle}>The Watcher</h2></Link>
	  			<Link style={linkStyle} to="/">Homepage</Link>
				<Link style={linkStyle} to="/events">Events</Link>
				<Link style={linkStyle} to="/about">About</Link>
				<Link style={linkStyle} to="/contact">Contact Us</Link>
				{(this.props.id === 0) ? <Link style={loginStyle} to="/login">Login</Link> : <Link style={loginStyle} to={this.state.accountLink}>Account</Link>}
			</header>
  )};
}

//	Props:
Header.propTypes = {
	id: PropTypes.number.isRequired
};

//	CSS:
const headerStyle = {
	background: "linear-gradient(90deg, rgba(0, 217, 255, 0.836) 0%, rgb(153, 0, 255) 100%)",
	color: "white",
	textAlign: "center",
	padding: "10px",
	borderBottomLeftRadius: "8px",
	borderBottomRightRadius: "8px"
}

const brandStyle = {
	float: "left",
	fontSize: "1.5rem",
	color: "white",
	position: "relative",
	left: "16px",
	top: "-5px"
}

const linkStyle = {
	color: "#fff",
	textDecoration: "none",
	fontSize: "1.2rem",
	position: "relative",
	top: "-3px",
	left: "-25vw",
	margin: "0px 0.7vw"
}

const loginStyle = {
	color: "#fff",
  	textDecoration: "none",
	float: "right",
	fontSize: "1.2rem",
	position: "relative",
	right: "16px",
	top: "-3px"
}

export default Header;
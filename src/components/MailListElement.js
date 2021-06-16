import React from 'react';
import { Link, withRouter } from "react-router-dom";

class MailListElement extends React.Component {

	constructor(props)
	{
		super(props);
		this.deleteMail = this.props.deleteMail.bind(this);
	}

	click = (e) => {
		e.preventDefault();
		this.props.deleteMail(this.props.ele.email);
	}
	
	render = () => {
		return (
			<li style={liStyle}>
				<Link to={( this.props.event && this.props.org) ? `analytics?eventId=${this.props.event.id}` : "#"} style={linkStyle}>
					{
						this.props.ele.email
					}
				</Link>
				<button style={buttonStyle} type="submit" onClick={this.click} >X</button>
			</li>
		);
	};
}

const liStyle = {
	width: "480px",
	height: "auto",
	margin: "auto",
	padding: "16px 12px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
	marginBottom: "20px",
	background:
		"linear-gradient(135deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 10%, rgba(48, 48, 48, 0.79) 90%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white",
	lineSpacing: "30px",
	fontSize: "1.3rem"
};

const linkStyle = {
	textDecoration: "none",
	color: "white"
};

const buttonStyle = {
	height: "auto",
	width: "auto",
	padding: "3px 5px",
	margin: "0 6px",
	background: "red",
	border: "0",
	borderRadius: "16px",
	fontSize: "1.1rem",
	color: "white",
	display: "inline-block",
	right: "0"
}

export default withRouter(MailListElement);
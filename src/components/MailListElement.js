import React from 'react';
import { Link, withRouter } from "react-router-dom";

class MailListElement extends React.Component {

	constructor(props){
		super(props);
		this.deleteMail = this.props.deleteMail.bind(this, this.props.email);
	}
	
	render = () => {
		return (
			<li style={liStyle}>
				<Link to={( this.props.event && this.props.org) ? `analytics?eventId=${this.props.event.id}` : "#"} style={linkStyle}>
					{
						this.props.ele.email
					}
				</Link>
				<button style={buttonStyle} type="submit" onClick={this.delete} >X</button>
			</li>
		);
	};
}

const liStyle = {
	width: "640px",
	height: "auto",
	margin: "auto",
	padding: "20px 10px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
	marginBottom: "20px",
	background:
		"linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 7%, rgba(48, 48, 48, 0.79) 93%, rgba(153, 0, 255, 0.6) 100%)",
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
	background: "red",
	color: "white",
	display: "inline-block",
	right: "0"
}

export default withRouter(MailListElement);
import React from "react";
import { Link } from "react-router-dom";

class EventListElement extends React.Component {
	state = {
		event: this.props.event,
		eventLink: `/event/${this.props.event.id}`
	};

	render = () => {
		return (
			<li style={liStyle}>
				<Link to={this.state.eventLink} style={linkStyle}>
					{this.state.event.name}
				</Link>
				<p style={pStyle}>{this.state.event.body}</p>
			</li>
		);
	};
}

const liStyle = {
	width: "1280px",
	height: "auto",
	margin: "auto",
	padding: "40px 70px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
	marginTop: "20px",
	background:
		"linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 8%, rgba(48, 48, 48, 0.79) 92%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white",
	lineSpacing: "30px",
	fontSize: "1.2rem",
};

const linkStyle = {

}

const pStyle = {
	textAlign: "left",
	fontSize: "1rem",
};

export default EventListElement;

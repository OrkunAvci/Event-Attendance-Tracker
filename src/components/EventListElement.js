import React from 'react'
import axios from 'axios';

class EventListElement extends React.Component {
	render = () => {
		const {event} = this.props;
		return (
			<li style={liStyle}>
				<h3>{event.title}</h3>
				<p style={pStyle}>{event.body}</p>
			</li>
	)};
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
	background: "linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 8%, rgba(48, 48, 48, 0.79) 92%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white",
	lineSpacing: "30px",
	fontSize: "1.2rem"
}

const pStyle = {
	textAlign: "left",
	fontSize: "1rem"
}

export default EventListElement;
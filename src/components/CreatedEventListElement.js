import React from "react";
import { Link } from "react-router-dom";

class CreatedEventListElement extends React.Component {
	state = {
		event: this.props.event,
		dateOptions: {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		},
	};

	render = () => {
		return (
			<li style={liStyle}>
				<Link
					to={
						this.props.event
							? new Date() < new Date(this.props.event.startDate)
								? `/event?id=${this.props.event.id}` + ((new Date() < new Date(this.state.event.formDate)) ? "&creator=true" : "")
								: `/analytics?id=${this.props.event.id}`
							: "#"
					}
					style={linkStyle}
				>
					{this.state.event.name}
				</Link>
				<p style={pStyle}>
					Event time:{" "}
					{new Date(this.state.event.startDate).toLocaleDateString(
						"en-TR",
						this.state.dateOptions
					)}{" "}
					-{" "}
					{new Date(this.state.event.endDate).toLocaleDateString(
						"en-TR",
						this.state.dateOptions
					)}
					.
				</p>
			</li>
		);
	};
}

const liStyle = {
	width: "1080px",
	height: "auto",
	margin: "auto",
	padding: "20px 100px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
	marginBottom: "20px",
	background:
		"linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 7%, rgba(48, 48, 48, 0.79) 93%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white",
	lineSpacing: "30px",
	fontSize: "1rem",
};

const linkStyle = {
	textDecoration: "none",
	color: "white",
	fontSize: "1.3rem",
};

const pStyle = {
	textAlign: "left",
	margin: "8px 16px",
};

export default CreatedEventListElement;

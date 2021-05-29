import React from "react";
import { Link } from "react-router-dom";

class Event extends React.Component {
	state = {
		eventId: 0,
		event: null,
		fromLink: `#`,
		redirectionLink: `#`
	};

	render = () => {
		return (
			<div style={eventContainerStyle}>
				<div style={infoStyle}>
					<h2 style={{ marginBottom: "10px" }}>Event Name</h2>
					<p style={{ textAlign: "left" }}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad non
						delectus voluptatibus tenetur, deserunt molestias quos fugiat
						assumenda et incidunt est obcaecati natus omnis optio soluta odio at
						quam architecto. Harum, beatae, repellat cum incidunt corrupti animi
						facere asperiores, a ut atque quia blanditiis. Sint eos nemo rerum
						quia! Ratione reprehenderit, laudantium assumenda repudiandae
						commodi exercitationem doloribus earum officia error aperiam nam,
						mollitia eligendi odit dolorum in ducimus labore nulla! Illum dicta
						odit quis quo vero, qui id quam rerum velit aut? Dolore alias
						molestias quia cum quod? Quas alias consequuntur cupiditate minima
						nam vel ipsum mollitia quis earum molestias!
					</p>
				</div>
				<button style={buttonStyle}>
					<Link to={this.state.formLink} style={{ color: "white" }}>
						Form Page
					</Link>
				</button>
				<button style={buttonStyle}>
					<Link to={this.state.redirectionLink} style={{ color: "white" }}>
						Redirection Page
					</Link>
				</button>
			</div>
		);
	};
}

const eventContainerStyle = {
	height: "400px",
	width: "1440px",
	margin: "auto",
	padding: "40px 70px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
	marginTop: "100px",
	marginBottom: "100px",
	background:
		"linear-gradient(135deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 10%, rgba(48, 48, 48, 0.79) 90%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white",
};

const infoStyle = {
	height: "auto",
	width: "1180px",
	margin: "auto",
	padding: "auto 270px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
};

const buttonStyle = {
	width: "350px",
	height: "54px",
	margin: "70px 120px",
	padding: "auto",
	border: "none",
	boxShadow: "2px 3px rgba(28, 28, 28, 0.49)",
	borderRadius: "24px",
	color: "white",
	fontSize: "20px",
	background:
		"linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(98, 98, 98, 0.79) 35%, rgba(98, 98, 98, 0.79) 65%, rgba(153, 0, 255, 0.6) 100%)",
};

export default Event;

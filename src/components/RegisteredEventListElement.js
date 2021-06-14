import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class RegisteredEventListElement extends React.Component {
	state = {
		event: this.props.event,
		eventLink: `/event?id=${this.props.event.id}`,
		code: "",
		dateOptions: { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric' }
	};

	shouldComponentUpdate(prevProps){
		return prevProps.email !== this.props.email;
	}

	componentDidMount(){
		if (this.state.code === "")
		{
			axios
			.get(`registration/getCode?email=${this.props.email}&eventId=${this.state.event.id}`)
			.then((res) => {
				this.setState({
					code: res.data
				});
			})
			.catch(console.error);
			this.forceUpdate();
		}
	}

	render = () => {
		return (
			<li style={liStyle}>
				<Link to={this.state.eventLink} style={linkStyle}>
					{this.state.event.name}
				</Link>
				<p style={pStyle}>{(this.state.code)}</p>
				<p style={pStyle}>Event starts at {(new Date(this.state.event.startDate)).toLocaleDateString('en-TR', this.state.dateOptions)}</p>
				<p style={pStyle}>Created by {this.state.event.user.name + " " + this.state.event.user.surname}</p>
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
	marginBottom: "20px",
	background:
		"linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 8%, rgba(48, 48, 48, 0.79) 92%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white",
	lineSpacing: "30px",
	fontSize: "1.2rem"
};

const linkStyle = {
	textDecoration: "none",
	color: "white"
};

const pStyle = {
	textAlign: "left",
	fontSize: "1rem",
	margin: "16px"
};

export default RegisteredEventListElement;
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import query from 'query-string'

class Event extends Component {
	state = {
		event: null
	};

	componentDidMount(){

		const values = query.parse(this.props.location.search);
		console.log(values.id);


		axios
			.get(`/event/getEventById?id=${values.id}`)
			.then((res) => {
				this.setState({
					event: res.data
				});
				console.log(this.state.event);
			})
			.catch(console.error);
		
		
	}

	render = () => {
		return (
			<div style={eventContainerStyle}>
				<div style={infoStyle}>
					<h2 style={{ marginBottom: "10px" }}>{(this.state.event) ? this.state.event.name : ""}</h2>
					{
						(this.state.event !== null) ? 
						<p style={{ textAlign: "left" }}>
							Can register before {this.state.event.formDate}.
						</p> : ""
					}
				</div>
				<button style={buttonStyle}>
					<Link to={(this.state.formLink) ? this.state.formLink : (this.state.event !== null) ? `/form?id=${this.state.event.id}` : "#"} style={{ color: "white" }}>
						Form Page
					</Link>
				</button>
				<button style={buttonStyle}>
					<Link to={(this.state.redirectionLink) ? this.state.redirectionLink : (this.state.event !== null) ? `/redirect?id=${this.state.event.id}` : "#"} style={{ color: "white" }}>
						Redirection Page
					</Link>
				</button>
			</div>
		);
	};
}

const eventContainerStyle = {
	height: "auto",
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
	marginBottom: "40px",
	padding: "auto",
	border: "none",
	boxShadow: "2px 3px rgba(28, 28, 28, 0.49)",
	borderRadius: "24px",
	color: "white",
	fontSize: "20px",
	background:
		"linear-gradient(45deg, rgba(0, 217, 255, 0.536) 0%, rgba(98, 98, 98, 0.79) 35%, rgba(98, 98, 98, 0.79) 65%, rgba(153, 0, 255, 0.6) 100%)",
};

export default withRouter(Event);

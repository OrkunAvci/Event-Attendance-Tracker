import React from 'react';
import axios from "axios";

import EventList from "../EventList";

class Events extends React.Component {
	
	state = {
		eventName: "",
		list: []
	}

	search_events= (e) => {
		e.preventDefault();

		axios
			.get(`/event/getEventByName?name=${this.state.eventName}`)
			.then((res) => {
				console.log(res.data);
				this.setState({
					list: res.data,
				});
			})
			.catch((err) => {
				console.error(err);
			});
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	render() {
		return(
			<div>
				<div style={searchContainerStyle}>
					<h2>Enter Event Name</h2>
					<form>
						<input type="text" name="eventName" style={searchStyle} onChange={this.update_fields} />
						<button type="submit" style={buttonStyle} onClick={this.search_events}>Search</button>
					</form>
				</div>
				<EventList list={this.state.list}/>
			</div>
		)
	}
}

const searchContainerStyle = {
	height: "auto",
	width: "800px",
	margin: "auto",
	padding: "30px 50px",
	boxSizing: "border-box",
	display: "inline-block",
	position: "relative",
	marginTop: "50px",
	marginBottom: "70px",
	background:
		"linear-gradient(45deg, rgba(0, 217, 255, 0.436) 0%, rgb(48, 48, 48, 0.79) 20%, rgba(48, 48, 48, 0.79) 80%, rgba(153, 0, 255, 0.5) 100%)",
	borderRadius: "48px",
	textAlign: "middle"
};

const searchStyle = {
	display: "block",
	width: "480px",
	margin: "20px",
	marginLeft: "100px",
	textAlign: "middle"
};

const buttonStyle = {
	padding: "5px 15px",
	borderRadius: "6px",
	border: "0",
	marginTop: "20px",
	marginBottom: "20px",
	position: "relative",
	left: "auto",
};

export default Events;
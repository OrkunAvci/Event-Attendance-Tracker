/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import query from "query-string";

import RegisteredEventList from '../RegisteredEventList';
import EventList from '../EventList';
import CreatedEventList from '../CreatedEventList';
export class Account extends Component {
	
	state = {
		id: 0,
		user: null,
		registered: [],
		created: []
	}

	logout = () => {
		this.props.logout();
		this.props.history.push(`/`);
	}
	
	async componentDidMount(){

		if (this.state.id !== 0)
		{
			return;
		}

		let values = query.parse(this.props.location.search);
		console.log(values.id);
		this.setState({
			id: values.id,
		});

		await axios.get(`/user/getUser?id=${values.id}`)
		.then((res)=>{
			console.log(res);
			this.setState({
				user: res.data
			});
		})
		.catch(console.error);

		await axios.get(`/registration/getRegEvents?email=${this.state.user.email}`)
		.then((res)=>{
			console.log(res.data)
			this.setState({
				registered: res.data
			})
		})
		.catch((err)=>{
			console.error(err);
		})

		await axios.get(`/event/findUserEvents?id=${this.state.user.id}`)
			.then((res) => {
				this.setState({
					created: res.data
				});
			})
			.catch(console.error);

	}

	render() {
		const {user, list} = this.state;
		return (
			<div>
				<div style={userStyle}>
					{user ? (
						<h2>
							{user.name} {user.surname}
						</h2>
					) : (
						""
					)}

					{user ? <p style={pStyle}>Registered Email: {user.email}</p> : ""}

					{user ? (
						<p style={pStyle}>Organizer: {user.organizer ? "True" : "False"}</p>
					) : (
						""
					)}

					<button style={buttonStyle} type="submit" onClick={this.logout}>
						Logout
					</button>
				</div>
				<div style={eventContainerStyle}>
					{
						user && user.organizer ?
							<div style={headerStyle}>
								<div>Created Events</div>
								________________________________________________________________________
							</div> : ""
					}
					<ul>
						{
							user && user.organizer ?
								<CreatedEventList list={this.state.created} /> : ""
						}
					</ul>
				</div>
				<div style={eventContainerStyle}>
					<div style={headerStyle}>
						<div style={{margin: "0"}}>Registered Events</div>
						______________________________________________________________________________
					</div>
					<ul>
						{user ? (
							<RegisteredEventList
								list={this.state.registered}
								email={user.email}
							/>
						) : (
							""
						)}
					</ul>
				</div>
			</div>
		);
	}
}

const userStyle = {
	height: "300px",
	width: "1440px",
	margin: "auto",
	padding: "40px 70px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
	marginTop: "100px",
	marginBottom: "50px",
	background: "linear-gradient(135deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 10%, rgba(48, 48, 48, 0.79) 90%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white"
}

const eventContainerStyle = {
}

const headerStyle = {
	fontSize: "1.5rem",
	color: "black",
	marginBottom: "12px",
	marginTop: "48px",
	fontWeight: "bold"
};

const pStyle = {
	textAlign: "left",
	margin: "16px"
}

const buttonStyle = {
	padding: "5px 15px",
	borderRadius: "6px",
	border: "0",
	marginTop: "40px",
	marginBottom: "20px",
	position: "relative",
	left: "auto"
}

export default withRouter(Account);

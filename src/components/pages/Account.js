/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios';
import { withRouter } from "react-router-dom";
import query from "query-string";

import RegisteredEventList from '../RegisteredEventList';
export class Account extends Component {
	
	state = {
		id: 0,
		user: null,
		list: []
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
				list: res.data
			})
		})
		.catch((err)=>{
			console.error(err);
		})

	}

	render() {
		const {user, list} = this.state;
		return (
			<div>
				<div style={userStyle}>
					{
						(this.state.user) ?
						<h2>{this.state.user.name} {this.state.user.surname}</h2> : ""
					}

					{
						(this.state.user) ?
						<p style={pStyle}>Registered Email: {this.state.user.email}</p> : ""
					}

					{
						(this.state.user) ?
						<p style={pStyle}>Organizer: {(this.state.user.organizer) ? "True" : "False"}</p> : ""
					}

					<button style={buttonStyle} type="submit" onClick={this.logout}>Logout</button>

				</div>
				<div style={eventContainerStyle}>
					<ul>
						<RegisteredEventList list={list}/>
					</ul>
				</div>
			</div>
		)
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
	marginBottom: "100px",
	background: "linear-gradient(135deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 10%, rgba(48, 48, 48, 0.79) 90%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white"
}

const eventContainerStyle = {
}

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

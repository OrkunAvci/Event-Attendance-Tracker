/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios';

import EventList from '../EventList';
export class Account extends Component {
	
	state = {
		user: null,
		list: []
	}
	
	componentDidMount(){

		if (this.props.id === null)
		{
			return;
		}

		axios.get(`/user/getUser?id=${this.props.id}`)
		.then((res)=>{
			console.log(res);
			this.setState({
				user: res.data
			})
		})
		.catch(console.error);

		axios.get(`/event/getEventByName?name=Random`)
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
						(this.state.user === null) ?
						"":
						<h2>{this.state.user.name} {this.state.user.surname}</h2>
					}

				</div>
				<div style={eventContainerStyle}>
					<ul>
						<EventList list={list}/>
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

export default Account

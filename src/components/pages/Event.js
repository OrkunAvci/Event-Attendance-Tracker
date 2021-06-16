import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import query from "query-string";

import UserList from "../UserList";
import MailList from "../MailList";

class Event extends Component {
	state = {
		accountId: this.props.accountId,
		event: null,
		organizer: false,
		dateOptions: {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "numeric",
		},
		list: null,
		attended: null,
		didNotAttend: null,
		whitelist: "",
		whitelistList: [],
		blacklist: "",
		blacklistList: [],
	};

	async componentDidMount() {
		const values = query.parse(this.props.location.search);
		console.log(values.id);

		await axios
			.get(`/event/getEventById?id=${values.id}`)
			.then((res) => {
				this.setState({
					event: res.data,
				});
				console.log(this.state.event);
			})
			.catch(console.error);

		await axios
			.get(`registration/getRegistrations?id=${values.id}`)
			.then((res) => {
				this.setState({
					list: res.data,
					attended: res.data.filter((ele) => ele.attended === true),
					didNotAttend: res.data.filter((ele) => ele.attended !== true),
				});
				console.log(this.state.list);
				console.log(this.state.attended);
				console.log(this.state.didNotAttend);
			})
			.catch((err) => {
				console.error(err);
			});

		if (values.creator) {
			this.setState({
				organizer: true,
			});

			await this.updateLists();
		}
	}

	update_fields = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	addWhitelist = async (e) => {
		e.preventDefault();

		await axios
			.post(`whiteList/addWhiteList`, {
				event: { id: this.state.event.id },
				email: this.state.whitelist,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});

		this.updateLists();
	};

	deleteWhitelist= async (email) => {

		axios
			.post(`whitelist/deleteWhiteList?eventId=${this.state.event.id}&email=${email}`)
			.catch(console.error);

		this.updateLists();
	}

	addBlacklist = async (e) => {
		e.preventDefault();

		await axios
			.post(`blackList/addBlacklist`, {
				event: { id: this.state.event.id },
				email: this.state.blacklist,
			})
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});

		this.updateLists();
	};

	deleteBlacklist= async (email) => {
		
		axios
			.post(`blacklist/deleteBlackList?eventId=${this.state.event.id}&email=${email}`)
			.catch(console.error);
		
		await this.updateLists();
	}

	async updateLists(){
		await axios
			.get(`whiteList/getWhitelist?id=${this.state.event.id}`)
			.then((res) => {
				this.setState({
					whitelistList: res.data,
				});
				console.log(res.data);
			})
			.catch(console.error);
		
		await axios
			.get(`blackList/getBlacklist?id=${this.state.event.id}`)
			.then((res) => {
				this.setState({
					blacklistList: res.data,
				});
				console.log(res.data);
			})
			.catch(console.error);
	}

	render = () => {
		return (
			<div>
				<div style={eventContainerStyle}>
					<div style={infoStyle}>
						<h2 style={{ marginBottom: "10px" }}>
							{this.state.event ? this.state.event.name : ""}
						</h2>

						{this.state.event ? (
							<p style={pStyle}>Description: {this.state.event.description}.</p>
						) : (
							""
						)}

						{this.state.event ? (
							<p style={pStyle}>
								Event was created at{" "}
								{new Date(this.state.event.creationDate).toLocaleDateString(
									"en-TR",
									this.state.dateOptions
								)}
								.
							</p>
						) : (
							""
						)}

						{this.state.event ? (
							<p style={pStyle}>
								You can register to this event before{" "}
								{new Date(this.state.event.formDate).toLocaleDateString(
									"en-TR",
									this.state.dateOptions
								)}
								.
							</p>
						) : (
							""
						)}

						{this.state.event ? (
							<p style={pStyle}>
								Event starts at{" "}
								{new Date(this.state.event.startDate).toLocaleString(
									"en-TR",
									this.state.dateOptions
								)}
								.
							</p>
						) : (
							""
						)}

						{this.state.event ? (
							<p style={pStyle}>
								Event ends at{" "}
								{new Date(this.state.event.endDate).toLocaleString(
									"en-TR",
									this.state.dateOptions
								)}
								.
							</p>
						) : (
							""
						)}

						{this.state.event ? (
							<p style={p2Style}>
								Event is created by{" "}
								{this.state.event.user.name +
									" " +
									this.state.event.user.surname}
								.
							</p>
						) : (
							""
						)}

						{this.state.event &&
						new Date() < new Date(this.state.event.formDate) ? (
							<button style={buttonStyle}>
								<Link
									to={
										this.state.event ? `/form?id=${this.state.event.id}` : "#"
									}
									style={{ color: "white" }}
								>
									Form Page
								</Link>
							</button>
						) : (
							""
						)}
						{this.state.event &&
						new Date() > new Date(this.state.event.startDate) &&
						new Date() < new Date(this.state.event.endDate) ? (
							<button style={buttonStyle}>
								<Link
									to={
										this.state.event
											? `/redirect?id=${this.state.event.id}`
											: "#"
									}
									style={{ color: "white" }}
								>
									Redirection Page
								</Link>
							</button>
						) : (
							""
						)}
					</div>
				</div>
				{this.state.event && this.state.organizer ? (
					<div style={listContainerStyle}>
						<form>
							<div style={labelStyle}>Whitelist</div>
							<input
								style={inputStyle}
								type="text"
								name="whitelist"
								onChange={this.update_fields}
							/>
							<button style={button2Style} type="submit" onClick={this.addWhitelist}>
								Add Email
							</button>
						</form>
						<MailList list={this.state.whitelistList} color={"w"} org={true} deleteMail={this.deleteWhitelist} />
					</div>
				) : (
					""
				)}
				{this.state.event && this.state.organizer ? (
					<div style={listContainerStyle}>
						<form>
							<div style={labelStyle}>Blacklist</div>
							<input
								style={inputStyle}
								type="text"
								name="blacklist"
								onChange={this.update_fields}
							/>
							<button style={button2Style} type="submit" onClick={this.addBlacklist}>
								Add Email
							</button>
						</form>
						<MailList list={this.state.blacklistList} color={"b"} org={true} deleteMail={this.deleteBlacklist} />
					</div>
				) : (
					""
				)}
				{this.state.event &&
				new Date() > new Date(this.state.event.formDate) &&
				new Date() < new Date(this.state.event.startDate) ? (
					<div>
						<h1 style={headerStyle}>
							Registrations
							<br />
							____________________________________________________________________________________________________
						</h1>
						<UserList list={this.state.list} />
					</div>
				) : (
					""
				)}
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
	marginBottom: "50px",
	background:
		"linear-gradient(135deg, rgba(0, 217, 255, 0.536) 0%, rgba(48, 48, 48, 0.79) 10%, rgba(48, 48, 48, 0.79) 90%, rgba(153, 0, 255, 0.6) 100%)",
	borderRadius: "48px",
	color: "white",
};

const listContainerStyle = {
	height: "auto",
	width: "1440px",
	margin: "auto",
	padding: "20px 50px",
	boxSizing: "border-box",
	display: "block",
	position: "relative",
	marginBottom: "50px",
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

const labelStyle = {
	display: "block",
	color: "rgba(255, 253, 228, 0.9)",
	textAlign: "middle",
	fontSize: "1.3rem",
	marginBottom: "6px"
};

const pStyle = {
	textAlign: "left",
	margin: "16px",
};

const p2Style = {
	textAlign: "right",
	margin: "16px",
};

const headerStyle = {
	fontSize: "1.3rem",
	color: "black",
	marginBottom: "20px",
};

const inputStyle = {
	display : "inline-block",
	margin: "0 12px",
	borderRadius: "6px",
	border: "0",
	width: "350px",
	height: "20px",
	padding: "0px 5px"
}

const button2Style = {
	display: "inline",
	padding: "5px 15px",
	borderRadius: "6px",
	border: "0",
	margin: "12px 8px",
	position: "relative",
	left: "0"
}

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

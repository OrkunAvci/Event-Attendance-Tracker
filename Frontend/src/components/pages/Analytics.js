import React from "react";
import { withRouter } from "react-router-dom";
import query from "query-string";
import axios from "axios";

import UserList from "../UserList";

class Analytics extends React.Component {
	state = {
		event: null,
		attended: [],
		didNotAttend: []
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
			})
			.catch(console.error);
		
		await axios
			.get(`registration/getRegistrations?id=${values.id}`)
			.then((res) => {
					this.setState({
						attended: res.data.filter((ele) => ele.attended === true),
						didNotAttend: res.data.filter((ele) => ele.attended !== true)
					})
				})
			.catch((err) => {
				console.error(err);
			});

		await axios
			.get(`registration/getAnalytics?eventId=${values.id}`)
			.then((res) => {
					this.setState({
						analytics: res.data
					})
				})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		return (
			<div style={mainContainerStyle}>
				{
					(!this.state.analytics) ? "" :
					<div style={topContainerStyle}>
						<div style={nameStyle}>{(this.state.event) ? this.state.event.name : ""}</div>
						<div style={textStyle}>{`Total of ${this.state.analytics.registeredCount} people has registered to this event.`}</div>
						<div style={textStyle}>{`Out of them ${this.state.analytics.attendedCount} people has attended the event.`}</div>
						<div style={textStyle}>{`And ${this.state.analyticsnotAttendedCount} of them did not attend.`}</div>
						<div style={textStyle}>_______________________________________________________</div>
						<div style={textStyle}>{`Out of ${this.state.analytics.registeredCount} registrations ${this.state.analytics.registeredUserCount} of them were users and ${this.state.analytics.registeredGuestCount} of them were guests.`}</div>
						<div style={textStyle}>{`Out of ${this.state.analytics.attendedCount} attendants ${this.state.analytics.attendedUserCount} of them were users and ${this.state.analytics.attendedGuestCount} of them were guests.`}</div>
						<div style={textStyle}>{`Out of ${this.state.analytics.notAttendedCount} non-attendants ${this.state.analytics.notAttendedUserCount} of them were users and ${this.state.analytics.notAttendedGuestCount} of them were guests.`}</div>
						<div style={textStyle}>__________________________________________________________________________________</div>
					</div>
				}
				<div style={bottomContainerStyle}>
					{
						this.state.event ?
							<div>
								<h1 style={headerStyle}>
									Attended List
									<br />
									____________________________________________________________________________________________________
								</h1>
								<UserList list={this.state.attended} />
							</div> : ""
					}
					{
						this.state.event ?
							<div>
								<h1 style={headerStyle}>
									Did Not Attend List
									<br />
									____________________________________________________________________________________________________
								</h1>
								<UserList list={this.state.didNotAttend} />
							</div> : ""
					}
				</div>
			</div>
		);
	}
}

const mainContainerStyle = {
};

const topContainerStyle = {
	height: "auto",
	width: "1080px",
	margin: "auto",
	padding: "42px 100px",
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

const bottomContainerStyle = {};

const headerStyle = {
	fontSize: "1.4rem",
	color: "black",
	marginBottom: "20px",
};

const textStyle = {
	fontSize: "1.1rem",
	color: "white",
	margin: "6px 0",
	textAlign: "left"
};

const nameStyle = {
	color: "white",
	fontSize: "1.4rem",
	marginBottom: "24px"
};

export default withRouter(Analytics);

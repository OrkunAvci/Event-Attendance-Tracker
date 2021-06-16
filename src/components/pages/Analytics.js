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
				console.log(this.state.event);
			})
			.catch(console.error);
		
		await axios
			.get(`registration/getRegistrations?id=${values.id}`)
			.then((res) => {
				this.setState({
					attended: res.data.filter((ele) => ele.attended === true),
					didNotAttend: res.data.filter((ele) => ele.attended !== true),
				});
				console.log(this.state.attended);
				console.log(this.state.didNotAttend);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	render() {
		return (
			<div style={mainContainerStyle}>
				<div style={topContainerStyle}>
					<div>
						Some random text.
					</div>
				</div>
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
	fontSize: "1.3rem",
	color: "black",
	marginBottom: "20px",
};

export default withRouter(Analytics);

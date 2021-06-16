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

const mainContainerStyle = {};

const topContainerStyle = {};

const bottomContainerStyle = {};

const headerStyle = {
	fontSize: "1.3rem",
	color: "black",
	marginBottom: "20px",
};

export default withRouter(Analytics);

import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import query from "query-string";

class Log extends React.Component {
	
	state = {
		registration: null,
		form: null
	}

	async componentDidMount()
	{
		const values = query.parse(this.props.location.search);

		await axios
			.get(`/registration/getRegistration?email=${values.email}&eventId=${values.id}`)
			.then((res) => {
				this.setState({
					registration: res.data
				});
				console.log(res.data);
			})
			.catch(console.error);
		
		await axios
			.get(`/event/getForm?id=${values.id}`)
			.then((res) => {
				this.setState({
					form: res.data,
				});
				console.log(res.data);
			})
			.catch(console.error);
		
		this.setup();
	}

	capitalize = function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	setup = () => {
		let container = document.getElementById("container");
		let i;
		let strNoQ = this.state.form.questionStrs.length;
		for (i=0; i<strNoQ; i++){
			let text = document.createElement("div");
			text.classList.add("questionStyle");
			text.innerHTML = "Question: " + this.state.form.questionStrs[i].question;
			container.appendChild(text);

			text = document.createElement("div");
			text.classList.add("answerStyle");
			text.innerHTML = "Answer: " + this.state.registration.answerStr[i].answer;
			container.appendChild(text);

			container.appendChild(document.createTextNode("_________________________________________"));
		}

		let IntNoQ = this.state.form.questionInts.length;
		for (i=0; i<IntNoQ; i++){
			let text = document.createElement("div");
			text.classList.add("questionStyle");
			text.innerHTML = "Question: " + this.state.form.questionInts[i].question;
			container.appendChild(text);

			text = document.createElement("div");
			text.classList.add("answerStyle");
			text.innerHTML = "Answer: " + this.state.registration.answerInt[i].answer;
			container.appendChild(text);

			container.appendChild(document.createTextNode("_________________________________________"));
		}
	}

	render(){
		return (
			<div style={mainContainerStyle}>
				{
					(!this.state.registration || !this.state.form) ?
					"" : 
					<div style={logContainerStyle}>
						<div style={headerStyle}>{this.state.registration.email}</div>
						<div style={headerStyle}>{(this.state.registration.attended) ? "Attended" : "Did Not Attend"}</div>
						<div style={{textAlign: "left"}}>
						____________________________________________________________________________________________________________________________________________

						<div id="container"></div>

						</div>
					</div>
				}
			</div>
		)
	}
}

const mainContainerStyle = {

}

const logContainerStyle = {
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
}

const headerStyle = {
	fontSize: "1.3rem",
	color: "white",
	margin: "8px 0"
}

export default withRouter(Log);
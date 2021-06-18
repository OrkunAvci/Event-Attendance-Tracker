import React from 'react'
import axios from "axios";
import PropTypes from "prop-types";

import "../../css/CreateEvent.css";

class CreateEvent extends React.Component {
	state = {
		accountId: this.props.accountId,
		name: "",
		registerDate: null,
		startDate: null,
		endDate: null,
		auth: 0,
		loyalty: 0,
		eventLink: "",
		description: "",
		blacklist: "",
		whitelist: "",
		user: null,
		output: "",
		strQuestionNumber: 0,
		intQuestionNumber: 0
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	create_event = async (e) => {
		e.preventDefault();

		let strQuestions = [];
		let intQuestions = [];
		let strNoQ = this.state.strQuestionNumber;
		let intNoQ = this.state.intQuestionNumber;
		let i;
		for (i=0; i<strNoQ; i++)
		{
			let str = document.getElementById("SQ" + i);
			strQuestions.push({
				question: str.value
			});
		}
		for (i=0; i<intNoQ; i++)
		{
			let int = document.getElementById("IQ" + i);
			intQuestions.push({
				question: int.value
			})
		}
		console.log(strQuestions, intQuestions);

		await axios
			.get(`user/getUser?id=${this.state.accountId}`)
			.then((res) => {
				this.setState({
					user: res.data
				})
			})
			.catch(console.error);

		await this.setState({
			blacklist: (this.state.blacklist !== "") ? this.state.blacklist.split(',') : [],
			whitelist: (this.state.whitelist !== "") ? this.state.whitelist.split(',') : []
		});
		
		await axios
			.post("event/createEvent", {
				name: this.state.name,
				description: this.state.description,
				formDate: this.state.registerDate,
				startDate: this.state.startDate,
				endDate: this.state.endDate,
				eventUrl: this.state.eventLink,
				authorization: parseInt(this.state.auth),
				loyalty: parseInt(this.state.loyalty),
				form: {
					questionStrs: strQuestions,
					questionInts: intQuestions
				},
				user: {
					id: this.state.accountId,
				},
			})
			.then((res) => {

				let i;
				for (i = 0; i < this.state.whitelist.length; i++)
				{
					axios
						.post(`whiteList/addWhiteList`, {
							event: { id: res.data },
							email: this.state.whitelist[i],
						})
						.then((res) => {
							console.log(res.data);
						})
						.catch((err) => {
							console.error(err);
						});
				}

				for (i = 0; i < this.state.blacklist.length; i++)
				{
					axios
						.post(`blackList/addBlacklist`, {
							event: { id: res.data },
							email: this.state.blacklist[i],
						})
						.then((res) => {
							console.log(res.data);
						})
						.catch((err) => {
							console.error(err);
						});
				}


				this.setState({
					output:
						"Event has been registered. You can search it up in Events page.",
				});
				console.log(res);
			})
			.catch((err) => {
				this.setState({
					output: err.message,
				});
				console.error(err);
			});
	}

	add_str_fields = (e) => {
		e.preventDefault();

		let number = this.state.strQuestionNumber;
		this.setState({
			strQuestionNumber: number + 1
		});
		let container = document.getElementById("strQuestions");

		let text = document.createElement("div");
		text.classList.add("divStyle");
		text.innerHTML = "String Question " + (number + 1);
		container.appendChild(text);

		let input = document.createElement("input");
		input.classList.add("inputStyle");
		input.type = "text";
		input.id = "SQ" + number;
		container.appendChild(input);
	}

	add_int_fields = (e) => {
		e.preventDefault();

		let number = this.state.intQuestionNumber;
		this.setState({
			intQuestionNumber: number + 1
		});
		let container = document.getElementById("intQuestions");

		let text = document.createElement("div");
		text.classList.add("divStyle");
		text.innerHTML = "Integer Question " + (number + 1);
		container.appendChild(text);

		let input = document.createElement("input");
		input.classList.add("inputStyle");
		input.type = "text";
		input.id = "IQ" + number;
		container.appendChild(input);
	}

	clear_fields = (e) => {
		e.preventDefault();

		let container = document.getElementById("intQuestions");
		while (container.hasChildNodes()) {
			container.removeChild(container.lastChild);
		}
		this.setState({
			strQuestionNumber: 0
		});

		container = document.getElementById("strQuestions");
		while (container.hasChildNodes()) {
			container.removeChild(container.lastChild);
		}
		this.setState({
			intQuestionNumber: 0
		});
	}

	render() {
		return (
			<div style={containerStyle}>
				<h2 style={headerStyle}>Fill the event information</h2>
				<form>
					<div style={divisionStyle}>
					Event Information (All Required):
					<br />
					------------------------------------------------------------------------
					</div>

					<div style={divStyle}>Event Name</div>
					<input style={inputStyle} type="text" name="name" onChange={this.update_fields} max="256"/>

					<div style={divStyle}>Event Description</div>
					<textarea style={textareaStyle} name="description" onChange={this.update_fields} max="512"/>

					<div style={divStyle}>Event Link</div>
					<input style={inputStyle} type="text" name="eventLink" onChange={this.update_fields} max="256"/>

					<div style={divStyle}>Last Registration Date</div>
					<input style={inputStyle} type="date" name="registerDate" onChange={this.update_fields} />

					<div style={divStyle}>When does the event start?</div>
					<input style={inputStyle} type="datetime-local" name="startDate" onChange={this.update_fields} />

					<div style={divStyle}>When does the event end?</div>
					<input style={inputStyle} type="datetime-local" name="endDate" onChange={this.update_fields} />

					<div style={divStyle}>Attendance Loyalty</div>
					<input style={inputStyle} type="number" name="loyalty" min="1" max="100" onChange={this.update_fields} />

					<div style={divStyle}>Whitelisted Emails (Separate by comma)</div>
					<textarea style={textareaStyle} name="whitelist" onChange={this.update_fields} max="512"/>

					<div style={divStyle}>Blacklisted Emails (Separate by comma)</div>
					<textarea style={textareaStyle} name="blacklist" onChange={this.update_fields} max="512"/>

					<div style={divStyle}>Who can register to this event?</div>
					<div style={radioStyle}><input style={{marginRight: "6px"}} type="radio" value="0" name="auth" onChange={this.update_fields} />Everyone can join!</div>
					<div style={radioStyle}><input style={{marginRight: "6px"}} type="radio" value="1" name="auth" onChange={this.update_fields} />Only user in the system can join.</div>
					<div style={radioStyle}><input style={{marginRight: "6px"}} type="radio" value="2" name="auth" onChange={this.update_fields} />Only people in my company can join.</div>

					<div style={divisionStyle}>
					Registration Form Information:
					<br />
					------------------------------------------------------------------------
					</div>

					<button style={buttonStyle} type="submit" onClick={this.add_str_fields}>Add Str Field</button>

					<button style={buttonStyle} type="submit" onClick={this.add_int_fields}>Add Int Field</button>

					<button style={buttonStyle} type="submit" onClick={this.clear_fields}>Clear Fields</button>

					<div id="strQuestions">
					</div>

					<div id="intQuestions">
					</div>

					<div style={outputStyle}>{this.state.output}</div>

					<button style={buttonStyle} type="submit" onClick={this.create_event}>Create The Event</button>
				</form>
			</div>
		);
	}
}

// PropTypes
CreateEvent.propTypes = {
  accountId: PropTypes.number.isRequired
}

//CSS Styling:
const containerStyle = {
	height: "auto",
	width: "840px",
	margin: "auto",
	padding: "40px 70px",
	paddingBottom: "50px",
	boxSizing: "border-box",
	display: "inline-block",
	position: "relative",
	marginTop: "100px",
	background: "linear-gradient(45deg, rgba(0, 217, 255, 0.436) 0%, rgb(48, 48, 48, 0.79) 8%, rgba(48, 48, 48, 0.79) 92%, rgba(153, 0, 255, 0.5) 100%)",
	borderRadius: "48px",
	marginBottom: "150px"
}

const headerStyle = {
	color: "rgba(255, 253, 228, 0.9)",
	marginBottom: "30px",
	marginTop: "10px"
}

const divStyle = {
	color: "rgba(255, 253, 228, 0.9)",
	marginTop: "20px",
	left: "0",
	textAlign: "left",
	fontSize: "1.1rem"
}

const textareaStyle = {
	display : "block",
	marginTop: "4px",
	marginBottom: "16px",
	borderRadius: "8px",
	border: "0",
	width: "100%",
	height: "150px",
	padding: "0px 5px",
	resize: "none"
}

const radioStyle = {
	color: "rgba(255, 253, 248, 1.0)",
	marginTop: "4px",
	textAlign: "left"
}

const inputStyle = {
	display : "block",
	marginTop: "4px",
	marginBottom: "16px",
	borderRadius: "6px",
	border: "0",
	width: "100%",
	height: "20px",
	padding: "0px 5px"
}

const buttonStyle = {
	padding: "5px 15px",
	borderRadius: "6px",
	border: "0",
	height: "30px",
	width: "150px",
	textAlign: "center",
	margin: "0 16px",
	marginTop: "40px",
	marginBottom: "20px",
	position: "relative",
}

const outputStyle = {
	display : "block",
	color: "rgba(255, 103, 108, 1)",
	textAlign: "middle"
}

const divisionStyle = {
	color: "white",
	fontSize: "1.2rem",
	marginTop: "48px",
	textAlign: "left"
}

export default CreateEvent;
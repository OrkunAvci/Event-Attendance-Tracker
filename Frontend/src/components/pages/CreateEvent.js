import React from 'react'
import axios from "axios";
import PropTypes from "prop-types";

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
		max: 100,
		blacklist: "",
		whitelist: "",
		user: null,
		output: "",
		strQuestions: [],
		intQuestions: []
	}

	constructor(props){
		super(props);
		this.clear_str_field = this.clear_str_field.bind(this);
		this.clear_int_field = this.clear_int_field.bind(this);
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	create_event = async (e) => {
		e.preventDefault();

		let strQuestions = [];
		let intQuestions = [];
		let strNoQ = document.getElementById("strQuestions").childNodes.length;
		let intNoQ = document.getElementById("intQuestions").childNodes.length;
		let i;
		for (i=0; i<strNoQ; i++)
		{
			let str = document.getElementById("SQ" + i).children[1].value;
			strQuestions.push({
				question: str
			});
		}
		for (i=0; i<intNoQ; i++)
		{
			let int = document.getElementById("IQ" + i).children[1].value;
			intQuestions.push({
				question: int
			})
		}

		await axios
			.get(`user/getUser?id=${this.state.accountId}`)
			.then((res) => {
				this.setState({
					user: res.data
				})
			})
			.catch(console.error);

		await this.setState({
			blacklist: (this.state.blacklist !== "" && typeof this.state.blacklist === "string") ? this.state.blacklist.split(',') : [],
			whitelist: (this.state.whitelist !== "" && typeof this.state.whitelist === "string") ? this.state.whitelist.split(',') : []
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
				max: this.state.max,
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
					output: "Event could not be created. Plase check your information.",
				});
				console.error(err);
			});
	}

	add_str_fields = (e) => {
		e.preventDefault();

		let number = document.getElementById("strQuestions").childNodes.length;
		let container = document.getElementById("strQuestions");

		let miniContainer = document.createElement("div");
		miniContainer.id = "SQ" + number;

		let text = document.createElement("div");
		text.classList.add("divStyle");
		text.innerHTML = "String Question " + (number + 1);
		miniContainer.appendChild(text);

		let input = document.createElement("input");
		input.classList.add("input1Style");
		input.type = "text";
		input.name = "SQ" + number;
		miniContainer.appendChild(input);

		let button = document.createElement("button");
		button.type = "submit";
		button.classList.add("buttonStyle");
		button.name = "SQ" + number;
		button.onclick = this.clear_str_field;
		button.innerHTML = "X"
		miniContainer.appendChild(button);

		container.appendChild(miniContainer);
	}

	add_int_fields = (e) => {
		e.preventDefault();

		let number = document.getElementById("intQuestions").childNodes.length;
		let container = document.getElementById("intQuestions");

		let miniContainer = document.createElement("div");
		miniContainer.id = "IQ" + number;

		let text = document.createElement("div");
		text.classList.add("divStyle");
		text.innerHTML = "Integer Question " + (number + 1);
		miniContainer.appendChild(text);

		let input = document.createElement("input");
		input.classList.add("input1Style");
		input.type = "text";
		input.name = "IQ" + number;
		miniContainer.appendChild(input);

		let button = document.createElement("button");
		button.type = "submit";
		button.classList.add("buttonStyle");
		button.name = "IQ" + number;
		button.onclick = this.clear_int_field;
		button.innerHTML = "X"
		miniContainer.appendChild(button);

		container.appendChild(miniContainer);
	}

	clear_str_field= (e) => {
		e.preventDefault();

		let ele = document.getElementById(e.target.name);
		let container = document.getElementById("strQuestions");

		container.removeChild(ele);

		let i;
		for (i=0; i<container.children.length; i++)
		{
			console.log(container.children[i]);
			container.children[i].id = "SQ" + i;
			container.children[i].children[0].innerHTML = "String Question " + (i + 1);
			container.children[i].children[1].name = "SQ" + i;
			container.children[i].children[2].name = "SQ" + i;
			console.log(container.children[i]);
		}
	}

	clear_int_field= (e) => {
		e.preventDefault();

		let ele = document.getElementById(e.target.name);
		let container = document.getElementById("intQuestions");

		container.removeChild(ele);

		let i;
		for (i=0; i<container.children.length; i++)
		{
			container.children[i].id = "IQ" + i;
			container.children[i].children[0].innerHTML = "Integer Question " + (i + 1);
			container.children[i].children[1].name = "IQ" + i;
			container.children[i].children[2].name = "IQ" + i;
		}
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
					<input style={inputStyle} type="number" name="loyalty" min="0" max="100" onChange={this.update_fields} />

					<div style={divStyle}>What is the maximum number of participants?</div>
					<input style={inputStyle} type="number" name="max" min="1" max="500" onChange={this.update_fields} />

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

					<button style={buttonStyle} type="submit" onClick={this.add_str_fields}>Add Str Question</button>

					<button style={buttonStyle} type="submit" onClick={this.add_int_fields}>Add Int Question</button>

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
	margin: "0 24px",
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
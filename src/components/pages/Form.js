/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import query from "query-string";
import PropTypes from 'prop-types';

export class Form extends Component {
	state = {
		accountId: this.props.accountId,
		id: null,
		event: null,
		form: null,
		email: "",
		output: ""
	};

	async componentDidMount(){
		if (!(this.state.id === null || this.state.id === undefined)) {return;}

		if (!this.state.accountId)
		{
			this.setState({
				accountId: this.props.accountId
			});
		}

		let values = query.parse(this.props.location.search);
		if (values.id === undefined)
		{
			console.log("Id is undefined.");
			return;
		}
		this.setState({
			id: values.id
		});

		await axios
			.get(`/event/getEventById?id=${values.id}`)
			.then((res) => {
				this.setState({
					event: res.data
				});
				console.log(this.state.event);
			})
			.catch(console.error);

		if (new Date() < this.state.event.formDate)
		{
			this.props.history.push("/");
		}

		await axios
			.get(`/event/getForm?id=${values.id}`)
			.then((res) => {
				this.setState({
					form: res.data,
				});
				console.log(this.state.form);
			})
			.catch(console.error);
		
		let container = document.getElementById("strQuestions");
		let strNoQ = this.state.form.questionStrs.length;
		let i;
		for (i=0; i<strNoQ; i++){
			let text = document.createElement("div");
			text.classList.add("labelStyle");
			text.innerHTML = this.state.form.questionStrs[i].question;
			container.appendChild(text);

			let input = document.createElement("input");
			input.classList.add("input2Style");
			input.type = "text";
			input.id = "SA" + i;
			container.appendChild(input);
		}

		let IntNoQ = this.state.form.questionInts.length;
		container = document.getElementById("intQuestions");
		for (i=0; i<IntNoQ; i++){
			let text = document.createElement("div");
			text.classList.add("labelStyle");
			text.innerHTML = this.state.form.questionInts[i].question;
			container.appendChild(text);

			let input = document.createElement("input");
			input.classList.add("input2Style");
			input.type = "number";
			input.id = "IA" + i;
			container.appendChild(input);
		}
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	check = (e) => { this.setState( { [e.target.name]: ((e.target.checked) ? true : false) } ) };
	
	register = async (e) => {
		e.preventDefault();

		let strAnswers = [];
		let intAnswers = [];
		let strNoA = this.state.form.questionStrs.length;
		let intNoA = this.state.form.questionInts.length;
		let i;
		for (i=0; i<strNoA; i++)
		{
			let str = document.getElementById("SA" + i);
			strAnswers.push({
				answer: str.value
			});
		}
		for (i=0; i<intNoA; i++)
		{
			let int = document.getElementById("IA" + i);
			intAnswers.push({
				answer: parseInt(int.value)
			})
		}
		console.log(intAnswers, strAnswers);
		
		let flag = false;
		await axios.post("registration/createRegistration", {
			email: this.state.email,
			event: this.state.event,
			answerStr: strAnswers,
			answerInt: intAnswers,
			authorization: (this.props.accountId || this.props.accountId === 0) ? 0 : 1
		})
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			this.setState({
				output: err.message,
			});
			flag = true;
			console.error(err);
		});

		if (flag === true)	{return;}

		await axios
			.get(`registration/getCode?email=${this.state.email}&eventId=${this.state.id}`)
			.then((res) => {
				this.setState({
					output: res.data,
				});
			})
			.catch(console.error);
		
		this.forceUpdate();
	}

	render() {
		return (
			<div style={containerStyle}>
				<h2 style={headingStyle}>{(this.state.event === null) ? "" : this.state.event.name}</h2>
				<form>
					<label className="labelStyle">Email?</label>
					<input className="input2Style" type="email" name="email" onChange={this.update_fields}/>

					<div id="strQuestions"></div>

					<div id="intQuestions"></div>
					
					<div style={outputStyle}>{this.state.output}</div>

					<button style={buttonStyle} type="submit" onClick={this.register}>Register</button>
				</form>
			</div>
		);
	}
}

Form.propTypes = {
	accountId: PropTypes.number.isRequired
}

//CSS Styling:
const containerStyle = {
	height: "auto",
	width: "700px",
	margin: "auto",
	padding: "40px 70px",
	boxSizing: "border-box",
	display: "inline-block",
	position: "relative",
	marginTop: "100px",
	background: "linear-gradient(45deg, rgba(0, 217, 255, 0.436) 0%, rgb(48, 48, 48, 0.79) 15%, rgba(48, 48, 48, 0.79) 85%, rgba(153, 0, 255, 0.5) 100%)",
	borderRadius: "48px",
	marginBottom: "150px",
}

const headingStyle = {
	color: "rgba(255, 253, 228, 0.9)",
	marginBottom: "40px",
	marginTop: "10px"
}

const labelStyle = {
	display : "block",
	color: "rgba(255, 253, 228, 0.9)",
	textAlign: "left"
}

const inputStyle = {
	display : "inline-block",
	marginTop: "4px",
	marginBottom: "16px",
	borderRadius: "6px",
	border: "0",
	width: "75%",
	height: "20px",
	padding: "0px 5px"
}

const outputStyle = {
	display : "block",
	color: "rgba(255, 103, 108, 1)",
	textAlign: "middle"
}

const buttonStyle = {
	padding: "5px 15px",
	borderRadius: "6px",
	border: "0",
	height: "30px",
	width: "150px",
	textAlign: "center",
	marginTop: "40px",
	marginBottom: "20px",
	position: "relative",
	left: "auto",
}

export default withRouter(Form);
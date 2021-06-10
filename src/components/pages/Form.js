/* eslint-disable no-unused-vars */
import React, {Component} from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import query from "query-string";

export class Form extends Component {
	state = {
		id: null,
		event: null,
		form: null,
		email: "",
		intField1: 0,
		intField2: 0,
		strField1: "",
		strField2: "",
		strField3: "",
		chkField1: false,
		chkField2: false,
		chkField3: false,
		output: ""
	};

	async componentDidMount(){
		if (!(this.state.id === null || this.state.id === undefined)) {return;}

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

		await axios
			.get(`/event/getForm?id=${values.id}`)
			.then((res) => {
				this.setState({
					form: res.data,
				});
				console.log(this.state.form);
			})
			.catch(console.error);
		
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	check = (e) => { this.setState( { [e.target.name]: ((e.target.checked) ? true : false) } ) };
	
	register = (e) => {
		e.prevetDefault();

		let flag = false;

		axios.post("registration/createRegistration", {
			email: this.state.email,
			event: {id: this.state.event.id},
			intField1: (this.state.form.formField.intField1) ? parseInt(this.state.intField1) : 0,
			intField2: (this.state.form.formField.intField2) ? parseInt(this.state.intField2) : 0,
			strField1: (this.state.form.formField.strField1) ? this.state.strField1 : "",
			strField2: (this.state.form.formField.strField2) ? this.state.strField2 : "",
			strField3: (this.state.form.formField.strField3) ? this.state.strField3 : "",
			chkField1: (this.state.form.formField.chkField1) ? this.state.chkField1 : false,
			chkField2: (this.state.form.formField.chkField2) ? this.state.chkField2 : false,
			chkField3: (this.state.form.formField.chkField3) ? this.state.chkField3 : false
		})
		.then((res) => {
			if (res.status === 200)
			{
				flag= true;
			}
		})
		.catch(console.error);

		axios
			.get(`registration/getCode?email=${this.state.email}&id=${this.state.id}`)
			.then((res) => {
				this.setState({
					output: res.data,
				});
			})
			.catch(console.error);
	}

	render() {
		return (
			<div style={containerStyle}>
				<h2 style={headingStyle}>{(this.state.event === null) ? "" : this.state.event.name}</h2>
				<form>
					<label style={labeStyle}>Email</label>
					<input style={inputStyle} type="email" name="email" onChange={this.update_fields}/>
					
					{
						(this.state.form !== null && this.state.form.formField.strField1) ?
						<div>
							<label style={labeStyle}>{this.state.form.formLabel.strField1}</label>
							<input style={inputStyle} type="text" name="strField1" onChange={this.update_fields}/>
						</div> : ""
					}

					{
						(this.state.form !== null && this.state.form.formField.strField2) ?
						<div>
							<label style={labeStyle}>{this.state.form.formLabel.strField2}</label>
							<input style={inputStyle} type="text" name="strField2" onChange={this.update_fields}/>
						</div> : ""
					}

					{
						(this.state.form !== null && this.state.form.formField.strField3) ?
						<div>
							<label style={labeStyle}>{this.state.form.formLabel.strField3}</label>
							<input style={inputStyle} type="text" name="strField3" onChange={this.update_fields}/>
						</div> : ""
					}

					{
						(this.state.form !== null && this.state.form.formField.intField1) ?
						<div>
							<label style={labeStyle}>{this.state.form.formLabel.intField1}</label>
							<input style={inputStyle} type="number" name="intField1" onChange={this.update_fields}/>
						</div> : ""
					}

					{
						(this.state.form !== null && this.state.form.formField.intField2) ?
						<div>
							<label style={labeStyle}>{this.state.form.formLabel.intField1}</label>
							<input style={inputStyle} type="number" name="intField2" onChange={this.update_fields}/>
						</div> : ""
					}

					{
						(this.state.form !== null && this.state.form.formField.chkField1) ?
						<div style={checkboxContainerStyle}>
						<input style={checkboxLabelStyle} type="checkbox" name="chkField1" onChange={this.check}/>
						<label style={checkboxLabelStyle}>{this.state.form.formLabel.chkField1}</label>
						</div> : ""
					}

					{
						(this.state.form !== null && this.state.form.formField.chkField2) ?
						<div style={checkboxContainerStyle}>
						<input style={checkboxLabelStyle} type="checkbox" name="chkField2" onChange={this.check}/>
						<label style={checkboxLabelStyle}>{this.state.form.formLabel.chkField2}</label>
						</div> : ""
					}

					{
						(this.state.form !== null && this.state.form.formField.chkField3) ?
						<div style={checkboxContainerStyle}>
						<input style={checkboxLabelStyle} type="checkbox" name="chkField3" onChange={this.check}/>
						<label style={checkboxLabelStyle}>{this.state.form.formLabel.chkField3}</label>
						</div> : ""
					}
					
					<div style={outputStyle} id="codeField">{this.state.output}</div>

					<button style={buttonStyle} type="submit" onClick={this.register}>Register</button>
				</form>
			</div>
		);
	}
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

const labeStyle = {
	display : "block",
	color: "rgba(255, 253, 228, 0.9)",
	textAlign: "left"
}

const inputStyle = {
	display : "block",
	marginTop: "4px",
	marginBottom: "16px",
	borderRadius: "6px",
	border: "0",
	width: "70%",
	height: "20px",
	padding: "0px 5px"
}

const checkboxContainerStyle = {
	display: "block",
	height: "20px",
	width: "600px",
	color: "rgba(255, 253, 228, 0.9)",
	float: "left",
	padding: "0px 7px",
	marginBottom: "5px"
}

const checkboxLabelStyle = {
	display: "block",
	height: "20px",
	color: "rgba(255, 253, 228, 0.9)",
	float: "left",
	padding: "0px 7px",
	marginBottom: "5px"
}

const whiteSpace = {
	display: "block",
	width: "600px",
	height: "140px"
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
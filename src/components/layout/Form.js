/* eslint-disable no-unused-vars */
import React, {Component} from "react";

export class Form extends Component {
	state = {
		id: "",
		eventName: "Event name goes here",
		fields: [],
		name: "",
		surname: "",
		email: "",
		intField1: 0,
		intField2: 0,
		intField3: 0,
		checkbox1: false,
		checkbox2: false,
		checkbox3: false,
		checkbox4: false,
		checkbox5: false,
		extraField: ""
	};

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	check = (e) => { this.setState( { [e.target.name]: ((e.target.checked) ? true : false) } ) };
	
	submitForm = (e) => {
		e.prevetDefault();
	}

	render() {
		return (
			<div style={containerStyle}>
				<h2 style={headingStyle}>{this.state.eventName}</h2>
				<form onSubmit={this.submitForm}>
					<label style={labeStyle}>Email</label>
					<input style={inputStyle} type="email" name="email" onChange={this.update_fields}/>
					
					<label style={labeStyle}>Surname</label>
					<input style={inputStyle} type="text" name="surname" onChange={this.update_fields}/>

					<label style={labeStyle}>Name</label>
					<input style={inputStyle} type="text" name="name" onChange={this.update_fields}/>

					<label style={labeStyle}>Number 1</label>
					<input style={inputStyle} type="number" name="intField1" onChange={this.update_fields}/>

					<label style={labeStyle}>Number 2</label>
					<input style={inputStyle} type="number" name="intField2" onChange={this.update_fields}/>

					<label style={labeStyle}>Number 3</label>
					<input style={inputStyle} type="number" name="intField3" onChange={this.update_fields}/>

					<label style={labeStyle}>Checkbox Quesion</label>
					
					<div style={checkboxContainerStyle}>
					<input style={checkboxLabelStyle} type="checkbox" name="checkbox1" onChange={this.check}/>
					<label style={checkboxLabelStyle}>Checkbox Option</label>
					</div>

					<div style={checkboxContainerStyle}>
					<input style={checkboxLabelStyle} type="checkbox" name="checkbox2" onChange={this.check}/>
					<label style={checkboxLabelStyle}>Checkbox Option</label>
					</div>

					<div style={checkboxContainerStyle}>
					<input style={checkboxLabelStyle} type="checkbox" name="checkbox3" onChange={this.check}/>
					<label style={checkboxLabelStyle}>Checkbox Option</label>
					</div>

					<div style={checkboxContainerStyle}>
					<input style={checkboxLabelStyle} type="checkbox" name="checkbox4" onChange={this.check}/>
					<label style={checkboxLabelStyle}>Checkbox Option</label>
					</div>

					<div style={checkboxContainerStyle}>
					<input style={checkboxLabelStyle} type="checkbox" name="checkbox5" onChange={this.check}/>
					<label style={checkboxLabelStyle}>Checkbox Option</label>
					</div>
					
					<div style={whiteSpace}></div>

					<label style={labeStyle}>Extra Field</label>
					<textarea style={textareaStyle} name="extraField" onChange={this.update_fields} maxLength="1024" />
					
					<div style={codeStyle} id="codeField">Code will appear here</div>

					<button style={buttonStyle} type="submit" onSubmit={this.submitForm}>Submit</button>
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

const codeStyle = {
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

export default Form;
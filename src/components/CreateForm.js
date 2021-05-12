import React from 'react'
import axios from 'axios';

export class CreateForm extends React.Component {

	state = {
		stringField1: "",
		stringField2: "",
		numberField1: "",
		numberField2: "",
		numberField3: "",
		checkboxField: "",
		numbOfCheckboxes: "",
		extraField: "",
		stringFild1Q: "",
		stringField2Q: "",
		numberField1Q: "",
		numberField2Q: "",
		numberField3Q: "",
		checkboxFieldQ: "",
		extraFieldQ: "",
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	check = (e) => { this.setState( { [e.target.name]: ((e.target.checked) ? true : false) } ) };

	submitForm = (e) => {
		e.prevetDefault();

		axios.post("http://localhost:8080/EventServise", {
			
		})
	}

	render = () => {
		return <div style={containerStyle}>
			<form onSubmit={this.submitForm}>
				<h2 style={headingStyle}>Select the fields you request from applicants</h2>
				<div style={checkboxContainerStyle}>
				<input style={checkboxLabelStyle} type="checkbox" name="checkbox2" onChange={this.check}/>
				<label style={checkboxLabelStyle}>String Field 1</label>
				<br />
				<input style={inputStyle} type="text" name="stringField1Q" onChange={this.updateFields}/>
				</div>

				<div style={checkboxContainerStyle}>
				<input style={checkboxLabelStyle} type="checkbox" name="checkbox3" onChange={this.check}/>
				<label style={checkboxLabelStyle}>String Field 2</label>
				<br />
				<input style={inputStyle} type="text" name="stringField2Q" onChange={this.updateFields}/>
				</div>

				<div style={checkboxContainerStyle}>
				<input style={checkboxLabelStyle} type="checkbox" name="numberField1" onChange={this.check}/>
				<label style={checkboxLabelStyle}>Number Field 1</label>
				<br />
				<input style={inputStyle} type="text" name="NumberField1Q" onChange={this.updateFields}/>
				</div>

				<div style={checkboxContainerStyle}>
				<input style={checkboxLabelStyle} type="checkbox" name="numberField2" onChange={this.check}/>
				<label style={checkboxLabelStyle}>Number Field 2</label>
				<br />
				<input style={inputStyle} type="text" name="numberField2Q" onChange={this.updateFields}/>
				</div>

				<div style={checkboxContainerStyle}>
				<input style={checkboxLabelStyle} type="checkbox" name="numberField3" onChange={this.check}/>
				<label style={checkboxLabelStyle}>Number Field 3</label>
				<br />
				<input style={inputStyle} type="text" name="numberField3Q" onChange={this.updateFields}/>
				</div>

				<div style={checkboxContainerStyle}>
				<input style={checkboxLabelStyle} type="checkbox" name="checkboxField" onChange={this.check}/>
				<label style={checkboxLabelStyle}>Checkbox Field</label>
				</div>

				<div style={checkboxContainerStyle}>
				<input style={checkboxLabelStyle} type="checkbox" name="extraField" onChange={this.check}/>
				<label style={checkboxLabelStyle}>Extra Field</label>
				</div>

				<button style={buttonStyle} type="submit" onSubmit={this.submitForm}>Submit</button>
			</form>
		</div>
	}
}

//CSS Styling:
const containerStyle = {
	height: "auto",
	width: "700px",
	margin: "auto",
	padding: "40px 70px",
	paddingBottom: "50px",
	boxSizing: "border-box",
	display: "inline-block",
	position: "relative",
	marginTop: "100px",
	background: "linear-gradient(45deg, rgba(0, 217, 255, 0.436) 0%, rgb(48, 48, 48, 0.79) 12%, rgba(48, 48, 48, 0.79) 88%, rgba(153, 0, 255, 0.5) 100%)",
	borderRadius: "48px",
	marginBottom: "150px",
}

const headingStyle = {
	color: "rgba(255, 253, 228, 0.9)",
	marginBottom: "40px",
	marginTop: "10px"
}

const checkboxContainerStyle = {
	display: "block",
	width: "600px",
	color: "rgba(255, 253, 228, 0.9)",
	float: "left",
	padding: "0px 7px",
	marginBottom: "10px"
}

const checkboxLabelStyle = {
	display: "block",
	height: "20px",
	color: "rgba(255, 253, 228, 0.9)",
	float: "left",
	padding: "0px 7px",
	marginBottom: "5px"
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

export default CreateForm;
import React from 'react'
import axios from "axios";
import PropTypes from "prop-types";

class CreateEvent extends React.Component {
	state = {
		accountId: this.props.accountId,
		name: "",
		registerDate: null,
		eventLink: "",
		intField1: "",
		intField2: "",
		strField1: "",
		strField2: "",
		strField3: "",
		chkField: "",
		chkField1: "",
		chkField2: "",
		chkField3: "",
	}

	update_fields = (e) => { this.setState( { [e.target.name]: e.target.value } ) };

	create_event = (e) => {
		e.preventDefault();

		axios
			.post("event/createEvent", {
				name: this.state.name,
				formDate: this.state.registerDate,
				eventUrl: this.state.eventLink,
				formUrl: "",
				redirectUrl: "",
				form: {
					formField: {
						intField1: this.state.intField1 !== "",
						intField2: this.state.intField2 !== "",
						strField1: this.state.strField1 !== "",
						strField2: this.state.strField2 !== "",
						strField3: this.state.strField3 !== "",
						chkField1: this.state.chkField1 !== "",
						chkField2: this.state.chkField2 !== "",
						chkField3: this.state.chkField3 !== "",
					},
					formLabel: {
						intField1: this.state.intField1,
						intField2: this.state.intField2,
						strField1: this.state.strField1,
						strField2: this.state.strField2,
						strField3: this.state.strField3,
						chkField1: this.state.chkField1,
						chkField2: this.state.chkField2,
						chkField3: this.state.chkField3,
					},
				},
			})
			.then((res) => {
				if (res.status === 200) {
					console.log("We good.");
				} else {
					console.log(res);
				}
			})
			.catch(console.error);
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
					<input style={inputStyle} type="text" name="name" onChange={this.update_fields} />

					<div style={divStyle}>Last Registration Date</div>
					<input style={inputStyle} type="date" name="registerDate" onChange={this.update_fields} />

					<div style={divStyle}>Event Link</div>
					<input style={inputStyle} type="text" name="eventLink" onChange={this.update_fields} />

					<div style={divisionStyle}>
					Registration Form Information (Only fill what is needed):
					<br />
					------------------------------------------------------------------------
					</div>

					<div style={divStyle}>Integer Field 1 Question</div>
					<input style={inputStyle} type="text" name="intField1" onChange={this.update_fields} />

					<div style={divStyle}>Integer Field 2 Question</div>
					<input style={inputStyle} type="text" name="intField2" onChange={this.update_fields} />

					<div style={divStyle}>String Field 1 Question</div>
					<input style={inputStyle} type="text" name="strField1" onChange={this.update_fields} />

					<div style={divStyle}>String Field 2 Question</div>
					<input style={inputStyle} type="text" name="strField2" onChange={this.update_fields} />

					<div style={divStyle}>String Field 3 Question</div>
					<input style={inputStyle} type="text" name="strField3" onChange={this.update_fields} />

					<div style={divStyle}>Checkbox Question</div>
					<input style={inputStyle} type="text" name="chkField" onChange={this.update_fields} />

					<div style={divStyle}>Checkbox Answer 1</div>
					<input style={inputStyle} type="text" name="chkField1" onChange={this.update_fields} />

					<div style={divStyle}>Checkbox Answer 2</div>
					<input style={inputStyle} type="text" name="chkField2" onChange={this.update_fields} />

					<div style={divStyle}>Checkbox Answer 3</div>
					<input style={inputStyle} type="text" name="chkField3" onChange={this.update_fields} />

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
	textAlign: "left"
};

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
	marginTop: "40px",
	marginBottom: "20px",
	position: "relative",
}

const divisionStyle = {
	color: "white",
	fontSize: "1.2rem",
	marginTop: "48px",
	textAlign: "left"
}

export default CreateEvent;
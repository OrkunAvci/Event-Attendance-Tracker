import React from 'react'

class CreateEvent {
	state = {
		event: {
			id: 0,
			name: "",
			creationDate: Date(),
			formDate: Date(),
			eventurl: "",
			formurl: "",
			redirectionurl: "",
			form: {
				id: 0,
				event: null,
				formField: {
					intField1: false,
					intField2: false,
					strField1: false,
					strField2: false,
					strField3: false,
					chkField1: false,
					chkField2: false,
					chkField3: false,
				},
				formLabel: {
					intField1: "",
					intField2: "",
					strField1: "",
					strField2: "",
					strField3: "",
					chkField1: "",
					chkField2: "",
					chkField3: "",
				},
			},
		},
	};

	update_fields = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	};

	render() {
		return (
			<div style={containerStyle}>
				<h2>Fill the event information</h2>
				<form>
					<label for="name">Event Name</label>
					<input type="text" name="name" onChange={this.update_fields} />
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

export default CreateEvent;
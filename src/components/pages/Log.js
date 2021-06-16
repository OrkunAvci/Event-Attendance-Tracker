import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import query from "query-string";

class Log extends React.Component {
	
	state = {
		registration: null,
		form: null
	}

	componentDidMount()
	{
		const values = query.parse(this.props.location.search);

		axios
			.get(`/registration/getRegistration?email=${values.email}&eventId=${values.id}`)
			.then((res) => {
				this.setState({
					registration: res.data
				});
				console.log(res.data);
			})
			.catch(console.error);
		
		axios
			.get(`/event/getForm?id=${values.id}`)
			.then((res) => {
				this.setState({
					form: res.data,
				});
				console.log(res.data);
			})
			.catch(console.error);
	}

	capitalize = function(str) {
		return str.charAt(0).toUpperCase() + str.slice(1);
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
						______________________________________________________________________________________________
							{
								(this.state.form.formField.intField1) ?
								<div>
									<div style={questionStyle}>Question: {this.state.form.formLabel.intField1}</div>
									<div style={answerStyle}>Answer: Answer: {this.state.registration.intField1}</div>
									______________________________________________________________________________________________
								</div> : ""
							}
							{
								(this.state.form.formField.intField2) ?
								<div>
									<div style={questionStyle}>Question: {this.state.form.formLabel.intField2}</div>
									<div style={answerStyle}>Answer: {this.state.registration.intField2}</div>
									______________________________________________________________________________________________
								</div> : ""
							}
							{
								(this.state.form.formField.strField1) ?
								<div>
									<div style={questionStyle}>Question: {this.state.form.formLabel.strField1}</div>
									<div style={answerStyle}>Answer: {this.state.registration.strField1}</div>
									______________________________________________________________________________________________
								</div> : ""
							}
							{
								(this.state.form.formField.strField2) ?
								<div>
									<div style={questionStyle}>Question: {this.state.form.formLabel.strField2}</div>
									<div style={answerStyle}>Answer: {this.state.registration.strField2}</div>
									______________________________________________________________________________________________
								</div> : ""
							}
							{
								(this.state.form.formField.strField3) ?
								<div>
									<div style={questionStyle}>Question: {this.state.form.formLabel.strField3}</div>
									<div style={answerStyle}>Answer: {this.state.registration.strField3}</div>
									______________________________________________________________________________________________
								</div> : ""
							}
							{
								(this.state.form.formField.chkField1) ?
								<div>
									<div style={questionStyle}>Question: {this.state.form.formLabel.chkField1}</div>
									<div style={answerStyle}>Answer: {this.capitalize(this.state.registration.chkField1.toString())}</div>
									______________________________________________________________________________________________
								</div> : ""
							}
							{
								(this.state.form.formField.chkField2) ?
								<div>
									<div style={questionStyle}>Question: {this.state.form.formLabel.chkField2}</div>
									<div style={answerStyle}>Answer: {this.capitalize(this.state.registration.chkField2.toString())}</div>
									______________________________________________________________________________________________
								</div> : ""
							}
							{
								(this.state.form.formField.chkField3) ?
								<div>
									<div style={questionStyle}>Question: {this.state.form.formLabel.chkField3}</div>
									<div style={answerStyle}>Answer: {this.capitalize(this.state.registration.chkField3.toString())}</div>
									______________________________________________________________________________________________
								</div> : ""
							}
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

const questionStyle = {
	marginTop: "8px",
	color: "white"
}

const answerStyle = {
}

export default withRouter(Log);
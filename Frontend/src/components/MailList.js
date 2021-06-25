import React from 'react'
import { withRouter } from 'react-router-dom';

import MailListElement from './MailListElement';

class MailList extends React.Component {
	
	render = () => {
		return (
			<div style={containerStyle}>
				{
					this.props.list === null
					? ""
					:	this.props.list.map((ele) => {
							return <MailListElement key={ele.email} ele={ele} color={this.props.color} org={this.props.org} deleteMail={this.props.deleteMail} />;
					  })
				}
			</div>
		)
	};
}
const containerStyle = {
	marginTop: "12px"
}

export default withRouter(MailList);
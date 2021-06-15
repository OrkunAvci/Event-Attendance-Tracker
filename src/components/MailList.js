import React from 'react'
import { withRouter } from 'react-router-dom';

import MailListElement from './MailListElement';

class MailList extends React.Component {
	
	render = () => {
		return this.props.list === null
			? ""
			:	this.props.list.map((ele) => {
					return <MailListElement key={ele.email} ele={ele} />;
			  })
	};
}

export default withRouter(MailList);
import React from 'react'
import { withRouter } from 'react-router-dom';

import UserListElement from './UserListElement';

class UserList extends React.Component {
	
	render = () => {
		return this.props.list === null
			? ""
			:	this.props.list.map((reg) => {
					return <UserListElement key={reg.email} reg={reg} />;
			  })
	};
}

export default withRouter(UserList);
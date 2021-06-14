import React from 'react'

import RegisteredEventListElement from "./RegisteredEventListElement";

class RegisteredEventList extends React.Component {
	render = () => {
		return this.props.list === null
			? ""
			: this.props.list.map((eve) => {
					return <RegisteredEventListElement key={eve.id} event={eve} email={this.props.email} />;
			  });
	};
}

export default RegisteredEventList;
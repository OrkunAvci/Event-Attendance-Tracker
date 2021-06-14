import React from 'react'

import EventListElement from "./EventListElement";

class RegisteredEventList extends React.Component {
	render = () => {
		return this.props.list === null
			? ""
			: this.props.list.map((eve) => {
					return <EventListElement key={eve.id} event={eve} email={this.props.email} />;
			  });
	};
}

export default RegisteredEventList;
import React from 'react'

import CreatedEventListElement from "./CreatedEventListElement";

class CreatedEventList extends React.Component {
	render = () => {
		return this.props.list === null
			? ""
			: this.props.list.map((eve) => {
					return <CreatedEventListElement key={eve.id} event={eve} />;
			  });
	};
}

export default CreatedEventList;
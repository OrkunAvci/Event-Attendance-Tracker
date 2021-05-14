import React from 'react'

import EventListElement from "./EventListElement";

class EventList extends React.Component {
	render = () => {
		return this.props.list.map((eve)=>{
			return <EventListElement key={eve} event={eve} />
		})
	};
}

export default EventList;
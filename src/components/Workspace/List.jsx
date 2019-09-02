import React, { Component } from 'react';

import Ticket from './Ticket';

import './style/List.css';

class List extends Component {
	state = {};

	componentWillMount = () => {};

	render() {
		return (
			<div className='list'>
				{this.props.tickets.map(ticket => {
					return (
						<Ticket
							title={ticket.title}
							info={ticket.info}
							labels={ticket.labels}
						></Ticket>
					);
				})}
			</div>
		);
	}
}

export default List;

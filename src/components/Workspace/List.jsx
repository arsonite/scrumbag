import React, { Component } from 'react';

import Ticket from './Ticket';

import './style/List.css';

class List extends Component {
	state = {
		tickets: []
	};

	componentWillMount = () => {
		this.setState({ tickets: this.props.tickets });
	};

	render() {
		return (
			<div className='list'>
				<span className='name'>{this.props.name}</span>

				<div className='tickets'>
					{this.state.tickets.map((ticket, i) => {
						return (
							<Ticket
								key={i}
								index={i}
								listIndex={this.props.listIndex}
								id={ticket.id}
								title={ticket.title}
								info={ticket.info}
								labels={ticket.labels}
								popIndex={this.props.popIndex}
							></Ticket>
						);
					})}
				</div>
			</div>
		);
	}
}

export default List;

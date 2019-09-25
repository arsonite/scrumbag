import React, { Component } from 'react';

import List from './List';
import Ticket from './Ticket';

import './style/Workspace.css';

class Workspace extends Component {
	_isMounted = false;

	state = {
		dirty: false, //

		/* */
		views: {
			available: ['Bars', 'List', 'Tiles'],
			current: 1
		},

		lists: {}, //

		/* */
		dragged: {
			bool: false, //
			ticket: {}, //
			/* */
			dimensions: {
				x: 0,
				y: 0,
				height: 0,
				width: 0
			},
			/* */
			index: {
				list: 0,
				ticket: 0
			}
		}
	};

	componentWillMount = async () => {
		this.setState({ lists: this.props.sharedData.data.projects[0].lists });
		this._isMounted = true;
	};

	/**
	 *
	 */
	drag = ({ config }) => {};

	/**
	 *
	 */
	popData = ({ config }) => {
		let dragged = this.state.dragged;
		this.setState({ dragged: config });
	};

	render() {
		if (!this._isMounted) return <p>No data available.</p>;

		let ticket = this.state.dragged.ticket;

		return (
			<div id='workspace'>
				{this.state.dragged ? (
					<Ticket
						key={'final'}
						title={ticket.title}
						info={ticket.info}
						labels={ticket.labels}
						popData={this.props.popData}
					></Ticket>
				) : (
					''
				)}

				<div id='ticketView'></div>

				<div id='content'>
					{this.state.lists.map((list, i) => {
						return (
							<List
								key={i}
								listIndex={i}
								name={list.name}
								tickets={list.tickets}
								popData={this.popData}
							></List>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Workspace;

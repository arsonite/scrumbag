import React, { Component } from 'react';

import List from './List';
import Ticket from './Ticket';

import './style/Workspace.css';

class Workspace extends Component {
	_isMounted = false;

	state = {
		dirty: false,

		views: {
			available: ['Bars', 'List', 'Tiles'],
			current: 1
		},

		data: {}
	};

	componentWillMount = () => {
		this.setState({ data: this.props.sharedData.data.projects[0].lists });
		this._isMounted = true;
	};

	/**
	 *
	 */
	assemble = data => {};

	render() {
		if (!this._isMounted) return <p>No data available.</p>;

		return (
			<div id='workspace'>
				<div id='ticketView'></div>

				<div id='content'>
					{this.state.data.map(list => {
						return <List name={list.name} tickets={list.tickets}></List>;
					})}
				</div>
			</div>
		);
	}
}

export default Workspace;

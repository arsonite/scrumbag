import React, { Component } from 'react';

import List from './List';

import './style/Workspace.css';

class Workspace extends Component {
	_isMounted = false;

	state = {
		dirty: false,

		lists: {},

		views: {
			available: ['Bars', 'List', 'Tiles'],
			current: 1
		},

		draggedTicket: [-1, -1]
	};

	componentWillMount = async () => {
		this.setState({ lists: this.props.sharedData.data.projects[0].lists });
		this._isMounted = true;
	};

	/**
	 *
	 */
	popIndex = (listIndex, index) => {
		console.log(listIndex, index);
	};

	render() {
		if (!this._isMounted) return <p>No data available.</p>;

		return (
			<div id='workspace'>
				<div id='ticketView'></div>

				<div id='content'>
					{this.state.lists.map((list, i) => {
						return (
							<List
								key={i}
								listIndex={i}
								name={list.name}
								tickets={list.tickets}
								popIndex={this.popIndex}
							></List>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Workspace;

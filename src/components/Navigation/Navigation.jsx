import React, { Component } from 'react';

import NavigationButton from './NavigationButton';

import './style/Navigation.css';

class Navigation extends Component {
	state = {
		index: null
	};

	/**
	 * @param {Number} index
	 * @param {Boolean} root
	 */
	popIndex = (index, root = false) => {
		if (root) {
			this.props.popIndex('navigation', index);
		}
		this.setState({ index: index });
	};

	render() {
		const items = this.props.items;

		return (
			<nav>
				{items.map((item, i) => {
					return (
						<React.Fragment key={i}>
							<NavigationButton
								item={item}
								index={i}
								isActive={this.props.currentIndex === i}
								popIndex={this.props.popIndex}
							/>
							{/* */}
							{this.props.subNav !== undefined && i < items.length - 1 ? (
								<hr />
							) : (
								''
							)}
						</React.Fragment>
					);
				})}
			</nav>
		);
	}
}

export default Navigation;

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
						<NavigationButton
							key={i}
							index={i}
							item={item}
							isActive={this.props.currentIndex === i}
							popIndex={this.props.popIndex}
						/>
					);
				})}
			</nav>
		);
	}
}

export default Navigation;

import React, { Component } from 'react';

import NavigationButton from './NavigationButton';

import './style/Navigation.css';

class Navigation extends Component {
	render() {
		return (
			<nav>
				{this.props.items.map(item => {
					return <NavigationButton item={item}></NavigationButton>;
				})}
			</nav>
		);
	}
}

export default Navigation;

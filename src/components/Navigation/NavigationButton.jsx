import React, { Component } from 'react';

import './style/NavigationButton.css';

class NavigationButton extends Component {
	render() {
		return <div className='nav-button'>{this.props.item}</div>;
	}
}

export default NavigationButton;

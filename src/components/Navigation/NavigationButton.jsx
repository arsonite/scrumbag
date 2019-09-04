import React from 'react';
import { Link } from 'react-router-dom';

import SVGWrapper from '../_common/SVGWrapper';

import { getPath } from 'config.js';

import './style/NavigationButton.css';

function NavigationButton(props) {
	const item = props.item.toLowerCase();

	return (
		<span
			/* If the subnavigation is active (non-collapsed), add className */
			className={`nav-button ${props.isActive ? 'active' : ''}`}
		>
			<Link
				className='link'
				/* Links to the name of the tab */
				to={`/${item}`}
			>
				<React.Fragment>
					<SVGWrapper src={getPath('nav')} icon={item} />

					<p>{props.item}</p>
				</React.Fragment>
			</Link>
		</span>
	);
}

export default NavigationButton;

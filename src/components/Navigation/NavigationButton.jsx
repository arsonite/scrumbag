import React from 'react';
import { Link } from 'react-router-dom';

import SVGWrapper from '../_common/SVGWrapper';

import { getPath } from 'config.js';

import './style/NavigationButton.css';

function NavigationButton(props) {
	return (
		<span
			/* If the subnavigation is active (non-collapsed), add className */
			className={`nav-button ${props.isActive ? 'active' : ''}`}
		>
			<Link
				className='link'
				/* Links to the name of the tab */
				to={`/${props.nav}`}
			>
				<React.Fragment>
					<SVGWrapper src={getPath('nav')} icon={props.tab} />

					<p>{props.tab}</p>

					{props.hasSubNav ? (
						<SVGWrapper src={getPath('icon')} icon={'arrow'} />
					) : (
						''
					)}
				</React.Fragment>
			</Link>
		</span>
	);
}

export default NavigationButton;

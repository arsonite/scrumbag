import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import Workspace from '../Workspace/Workspace';
import Settings from '../Settings/Settings';
import Profile from '../Profile/Profile';

// TODO: Temporary
import { projects } from './../../test_entries.json';

import './style/Application.css';

const items = [Home, Workspace, Settings, Profile];

class Application extends Component {
	state = {
		sharedData: {
			expanded: false,

			data: {}
		}
	};

	componentWillMount = async () => {
		let sharedData = this.state.sharedData;
		sharedData.data = { projects };
		this.setState({ sharedData: sharedData });
	};

	/**
	 *
	 */
	dynamicImport = async modules => {
		/* Using experimental dynamic imports to parse needed modules from response-body */
		modules.split(',').forEach(async (m, i) => {
			let component = m.trim();
			let sharedData = this.state.sharedData;
			/* Dynamically import .jsx module from /modules/ folder */
			let module = await import(`./${component}/${component}.jsx`);
			/* Ensures the correct index of modules in array */
			sharedData.modules[i] = module.default;
			this.setState({ sharedData: sharedData });
		});
	};

	render() {
		return (
			<div id='app'>
				<Navigation
					items={items.map(item => {
						return item.name;
					})}
				></Navigation>

				<main className={this.state.sharedData.expanded ? 'expanded' : ''}>
					<Switch>
						{items.map((Component, i) => {
							return (
								<Route
									key={Component.name}
									path={`/${Component.name.toLowerCase()}`}
									render={props => (
										<Component
											{...props}
											index={i}
											popIndex={this.popIndex}
											sharedData={this.state.sharedData}
										/>
									)}
								/>
							);
						})}
					</Switch>
				</main>
			</div>
		);
	}
}

export default Application;

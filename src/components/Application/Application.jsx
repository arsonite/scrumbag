import React, { Component } from 'react';
import { Link, Redirect, Switch } from 'react-router-dom';

import Navigation from '../Navigation/Navigation';
import Home from '../Home/Home';
import Workspace from '../Workspace/Workspace';
import Settings from '../Settings/Settings';
import Profile from '../Profile/Profile';

// TODO: Temporary
import { projects } from './../../test_entries.json';

import './style/Application.css';

const items = ['Home', 'Profile', 'Settings', 'Workspace'];

class Application extends Component {
	state = {
		sharedData: {
			expanded: true
		},

		data: {}
	};

	componentWillMount = async () => {
		let sharedData = this.state.sharedData;
		let data = { projects };
		this.setState({ sharedData: sharedData, data: data });
	};

	render() {
		console.log(this.state.data.projects[0]);

		return (
			<div id='app'>
				<Navigation items={items}></Navigation>

				<main className={this.state.sharedData.expanded ? 'expanded' : ''}>
					<Workspace
						sharedData={this.state.sharedData}
						data={this.state.data.projects[0].lists}
					></Workspace>
				</main>
			</div>
		);
	}
}

export default Application;

/*
<Switch>
	<Home></Home>

	<Profile></Profile>

	<Settings></Settings>

	<Workspace></Workspace>
</Switch>
*/

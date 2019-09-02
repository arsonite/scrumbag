import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Application from './components/Application/Application';

import * as serviceWorker from './services/serviceWorker';

import { DEBUG } from './config.js';

import './style/index.css';

if (!DEBUG) {
	console.warn = () => {};
	console.error = () => {};
}

ReactDOM.render(
	<BrowserRouter>
		<Application></Application>
	</BrowserRouter>,
	document.getElementById('root')
);

//serviceWorker.register(); // De-comment this to allow application to run offline
serviceWorker.unregister(); // Unregistering serviceWorker in order to prevent the app from running offline

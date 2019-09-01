import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './services/serviceWorker';

import { DEBUG } from './config.js';

import './style/index.css';

if (!DEBUG) {
	console.warn = () => {};
	console.error = () => {};
}

ReactDOM.render(
	<React.Fragment></React.Fragment>,
	document.getElementById('root')
);

serviceWorker.unregister();

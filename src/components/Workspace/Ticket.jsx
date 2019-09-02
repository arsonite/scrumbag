import React, { Component } from 'react';

import './style/Ticket.css';

class Ticket extends Component {
	state = {};

	componentWillMount = () => {};

	drag = () => {};

	render() {
		return (
			<div className='ticket'>
				<span className='labels'>
					{this.props.labels.map(label => {
						return (
							<span className='label' style={{ backgroundColor: label.color }}>
								{label.title}
							</span>
						);
					})}
				</span>

				<span className='title'>{this.props.title}</span>

				<span className='info'>{this.props.info}</span>
			</div>
		);
	}
}

export default Ticket;

function dragElement(elmnt) {
	let pos1 = 0,
		pos2 = 0,
		pos3 = 0,
		pos4 = 0;
	if (document.getElementById(elmnt.id + 'header')) {
		// if present, the header is where you move the DIV from:
		document.getElementById(elmnt.id + 'header').onmousedown = dragMouseDown;
	} else {
		// otherwise, move the DIV from anywhere inside the DIV:
		elmnt.onmousedown = dragMouseDown;
	}

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		pos3 = e.clientX;
		pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		pos1 = pos3 - e.clientX;
		pos2 = pos4 - e.clientY;
		pos3 = e.clientX;
		pos4 = e.clientY;
		// set the element's new position:
		elmnt.style.top = elmnt.offsetTop - pos2 + 'px';
		elmnt.style.left = elmnt.offsetLeft - pos1 + 'px';
	}

	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;
	}
}

var Draggable = React.createClass({
	getDefaultProps: function() {
		return {
			// allow the initial position to be passed in as a prop
			initialPos: { x: 0, y: 0 }
		};
	},
	getInitialState: function() {
		return {
			pos: this.props.initialPos,
			dragging: false,
			rel: null // position relative to the cursor
		};
	},
	// we could get away with not having this (and just having the listeners on
	// our div), but then the experience would be possibly be janky. If there's
	// anything w/ a higher z-index that gets in the way, then you're toast,
	// etc.
	componentDidUpdate: function(props, state) {
		if (this.state.dragging && !state.dragging) {
			document.addEventListener('mousemove', this.onMouseMove);
			document.addEventListener('mouseup', this.onMouseUp);
		} else if (!this.state.dragging && state.dragging) {
			document.removeEventListener('mousemove', this.onMouseMove);
			document.removeEventListener('mouseup', this.onMouseUp);
		}
	},

	// calculate relative position to the mouse and set dragging=true
	onMouseDown: function(e) {
		// only left mouse button
		if (e.button !== 0) return;
		var pos = $(this.getDOMNode()).offset();
		this.setState({
			dragging: true,
			rel: {
				x: e.pageX - pos.left,
				y: e.pageY - pos.top
			}
		});
		e.stopPropagation();
		e.preventDefault();
	},
	onMouseUp: function(e) {
		this.setState({ dragging: false });
		e.stopPropagation();
		e.preventDefault();
	},
	onMouseMove: function(e) {
		if (!this.state.dragging) return;
		this.setState({
			pos: {
				x: e.pageX - this.state.rel.x,
				y: e.pageY - this.state.rel.y
			}
		});
		e.stopPropagation();
		e.preventDefault();
	},
	render: function() {
		// transferPropsTo will merge style & other props passed into our
		// component to also be on the child DIV.
		return this.transferPropsTo(
			React.DOM.div(
				{
					onMouseDown: this.onMouseDown,
					style: {
						position: 'absolute',
						left: this.state.pos.x + 'px',
						top: this.state.pos.y + 'px'
					}
				},
				this.props.children
			)
		);
	}
});

React.renderComponent(
	Draggable(
		{
			initialPos: { x: 100, y: 200 },
			className: 'my-draggable',
			style: {
				border: '2px solid #aa5',
				padding: '10px'
			}
		},
		'Drag Me! See how children are passed through to the div!'
	),
	document.body
);

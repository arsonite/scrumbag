import React, { Component } from 'react';

import './style/Ticket.css';

class Ticket extends Component {
	state = {
		dragged: false,

		pos: {
			x: 0,
			y: 0
		},

		rel: {
			x: 0,
			y: 0
		}
	};

	constructor() {
		super();
		this.ref = React.createRef();
	}

	componentDidUpdate = (props, state) => {
		if (this.state.dragged && !state.dragged) {
			document.addEventListener('mousemove', this.onMouseMove);
			document.addEventListener('mouseup', this.onMouseUp);
		} else if (!this.state.dragged && state.dragged) {
			document.removeEventListener('mousemove', this.onMouseMove);
			document.removeEventListener('mouseup', this.onMouseUp);
		}
	};

	onMouseUp = e => {
		e.preventDefault();
		e.stopPropagation();

		this.setState({ dragged: false, pos: { x: 0, y: 0 } });
	};

	onMouseMove = e => {
		e.preventDefault();
		e.stopPropagation();

		if (!this.state.dragged) return;

		this.setState({
			dragged: true,
			pos: {
				x: e.pageX - this.state.rel.x,
				y: e.pageY - this.state.rel.y
			}
		});
	};

	/**
	 *
	 */
	drag = () => {};

	render() {
		return (
			<div
				className={
					'ticket' + (this.state.dragged ? ' dragged' : ' not-dragged')
				}
				ref={this.ref}
				style={{
					top: this.state.pos.y + 'px',
					left: this.state.pos.x + 'px'
				}}
				onMouseDown={e => {
					e.preventDefault();
					e.stopPropagation();

					if (e.button !== 0) return;

					let computedStyle = window.getComputedStyle(this.ref.current);
					let pos = {
						top: parseInt(computedStyle.top),
						left: parseInt(computedStyle.left)
					};

					this.setState({
						dragged: true,
						rel: {
							x: e.pageX - pos.left,
							y: e.pageY - pos.top
						}
					});
				}}
			>
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

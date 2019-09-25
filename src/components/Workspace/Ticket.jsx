import React, { Component } from 'react';

import { log } from 'util/debug.js';

import './style/Ticket.css';

class Ticket extends Component {
	state = {
		dragged: false,

		absolute: {
			x: 0,
			y: 0
		},

		relative: {
			x: 0,
			y: 0
		}
	};

	constructor() {
		super();

		this.ref = React.createRef();
	}

	render() {
		let dragged = this.props.dragged;

		return (
			<div
				id={this.props.id}
				className={'ticket' + (this.state.dragged ? ' dragged' : '')}
				ref={this.ref}
				style={{
					top: this.state.absolute.y + 'px',
					left: this.state.absolute.x + 'px'
				}}
				onMouseUp={e => {
					e.preventDefault();
					e.stopPropagation();

					this.setState({ dragged: false, pos: { x: 0, y: 0 } }, () => {
						this.props.popData(null);
					});
				}}
				onMouseMove={e => {
					e.preventDefault();
					e.stopPropagation();

					if (!this.state.dragged) return;

					const absolute = {
						x: e.pageX - this.state.relative.x,
						y: e.pageY - this.state.relative.y
					};
					this.setState(
						{
							dragged: true,
							absolute: absolute
						},
						() => {
							this.props.popData(
								this.props.listIndex,
								this.props.index,
								this.state.absolute
							);
						}
					);
					log(absolute);
				}}
				onMouseDown={e => {
					e.preventDefault();
					e.stopPropagation();

					if (e.button !== 0) return;

					let computedStyle = window.getComputedStyle(this.ref.current);
					let relative = {
						x: parseInt(computedStyle.top),
						y: parseInt(computedStyle.left)
					};

					this.setState(
						{
							dragged: true,
							relative: {
								x: e.pageX - relative.x,
								y: e.pageY - relative.y
							}
						},
						() => {
							this.props.popData(
								this.props.listIndex,
								this.props.index,
								relative
							);
						}
					);
					log(relative);
				}}
				onMouseLeave={e => {
					e.preventDefault();
					e.stopPropagation();

					this.setState({ dragged: false, absolute: { x: 0, y: 0 } });
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

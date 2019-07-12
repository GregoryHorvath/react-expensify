import React from 'react';

import AddOption from './AddOption';
import Options from './Options';
import Header from './Header';
import Action from './Action';

export default class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);

		// bind 'this' so they can refer to the component with 'this'
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);

		this.state = {
			options: props.options
		};
	}

	componentDidMount() {
		try {
			const json = localStorage.getItem('options');
			const options = JSON.parse(json);

			if (options) {
				this.setState(() => ({ options }));
			}
		} catch (e) {
			// Do nothing at all
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (prevState.options.length !== this.state.options.length) {
			const json = JSON.stringify(this.state.options);
			localStorage.setItem('options', json);
		}
	}
	componentWillUnmount() {
		console.log('CWU');
	}

	// Remove All button function
	handleDeleteOptions() {
		this.setState(() => ({ options: [] }));
	}

	// Single remove button function
	handleDeleteOption(optionToRemove) {
		this.setState((prevState) => ({
			options: prevState.options.filter((opt) => opt !== optionToRemove)
		}));
	}

	// What should I do? button function
	handlePick() {
		const randomNum = Math.floor(Math.random() * this.state.options.length);
		alert(this.state.options[randomNum]);
	}

	// Add Option button function
	handleAddOption(option) {
		if (!option) {
			return 'Enter valid value to add item';
		} else if (this.state.options.indexOf(option) > -1) {
			return 'This option already exists';
		}

		this.setState((prevState) => ({
			options: [...prevState.options, option]
		}));
	}

	render() {
		const subtitle = 'created by Greg';

		return (
			<div>
				<Header subtitle={subtitle} />
				<Action
					hasOptions={this.state.options.length > 0}
					handlePick={this.handlePick}
				/>
				<Options
					options={this.state.options}
					handleDeleteOptions={this.handleDeleteOptions}
					handleDeleteOption={this.handleDeleteOption}
				/>
				<AddOption handleAddOption={this.handleAddOption} />
			</div>
		);
	}
}
IndecisionApp.defaultProps = {
	options: []
};
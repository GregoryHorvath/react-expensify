import React from 'react';

export default class AddOption extends React.Component {
	state = {
		error: undefined
	};

	handleAddOption = (e) => {
		e.preventDefault();

		const option = e.target.addedOption.value.trim();
		const error = this.props.handleAddOption(option);

		this.setState(() => ({ error }));

		if (!error) {
			e.target.addedOption.value = '';
		}
	}

	render() {
		return (
			<div>
				{this.state.error && <p>{this.state.error}</p>}
				<form onSubmit={this.handleAddOption}>
					<input type="text" name="addedOption" autoFocus />
					<button>Add Option</button>
				</form>
			</div>
		);
	}
}
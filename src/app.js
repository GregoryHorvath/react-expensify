class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);

		// bind 'this' so they can refer to the component with 'this'
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);

		this.state = {
			options: ['Thing one', 'Thing two', 'Thing four']
		}
	}

	// Remove All button function
	handleDeleteOptions() {
		this.setState(() => {
			return {
				options: []
			};
		})
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

		this.setState((prevState) => {
			return {
				options: [...prevState.options, option]
			};
		})
	}

	render() {
		const title = 'Indecision';
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
				/>
				<AddOption handleAddOption={this.handleAddOption} />
			</div>
		);
	}
}

const Header = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			{props.subtitle && <h2>{props.subtitle}</h2>}
		</div>
	);
}
Header.defaultProps = {
	title: 'Indecision'
}

const Action = (props) => {
	return (
		<div>
			<button
				onClick={props.handlePick}
				disabled={!props.hasOptions}
			>
				What should I do?
					</button>
		</div>
	);
}

const Options = (props) => {
	return (
		<div>
			<button onClick={props.handleDeleteOptions}>Remove All</button>
			{
				props.options.map((opt) => <Option key={opt} optionText={opt} />)
			}
		</div>
	);
}

const Option = (props) => {
	return (
		<div>
			{props.optionText}
		</div>
	);
}

class AddOption extends React.Component {
	constructor(props) {
		super(props);
		this.handleAddOption = this.handleAddOption.bind(this);

		this.state = {
			error: undefined
		};
	}

	handleAddOption(e) {
		e.preventDefault();

		const option = e.target.addedOption.value.trim();
		const error = this.props.handleAddOption(option);

		this.setState(() => {
			return { error }
		});

		e.target.addedOption.value = '';
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

const User = () => {
	return (
		<div>
			<p>Name: </p>
			<p>Age: </p>
		</div>
	);
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
class IndecisionApp extends React.Component {
	constructor(props) {
		super(props);

		// bind 'this' so they can refer to the component with 'this'
		this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
		this.handleDeleteOption = this.handleDeleteOption.bind(this);
		this.handlePick = this.handlePick.bind(this);
		this.handleAddOption = this.handleAddOption.bind(this);

		this.state = {
			options: props.options
		}
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
			{props.options.length === 0 && <p>Please add option to get started.</p>}
			{
				props.options.map((opt) => (
					<Option
						key={opt}
						optionText={opt}
						handleDeleteOption={props.handleDeleteOption}
					/>
				))
			}
		</div>
	);
}

const Option = (props) => {
	return (
		<div>
			{props.optionText}
			<button
				onClick={(e) => {
					props.handleDeleteOption(props.optionText);
				}}
			>
				remove
			</button>
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

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
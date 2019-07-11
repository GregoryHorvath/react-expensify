const app = {
	title: 'Indecision App',
	subtitle: 'created by Horváth Gergely',
	options: []
}

const onFormSubmit = (e) => {
	e.preventDefault();

	const option = e.target.elements.option.value; // input named 'option'

	if (option) {
		app.options.push(option);
		e.target.elements.option.value = '';

		render();
	}
}

const onRemoveAll = () => {
	app.options = [];
	render();
}

const onMakeDecision = () => {
	const randomNum = Math.floor(Math.random() * app.options.length);
	const option = app.options[randomNum];

	alert(option);
}

const render = () => {
	const template = (
		<div>
			<h1>{app.title}</h1>
			{app.subtitle && <p>{app.subtitle}</p>}
			<p>{app.options.length > 0 ? 'Here are your options' : 'No options'}</p>
			<p>{app.options.length}</p>

			<button disabled={app.options.length === 0} onClick={onMakeDecision}>what should i do?</button>
			<button onClick={onRemoveAll}>remove all</button>

			<ol>
				{
					app.options.map((opt) => <li key={opt}>{opt}</li>)
				}
			</ol>
			<form onSubmit={onFormSubmit}>
				<input type="text" name="option" autoFocus />
				<button>Add Option</button>
			</form>
		</div>
	);

	ReactDOM.render(template, appRoot);
}

const appRoot = document.getElementById('app');

render();
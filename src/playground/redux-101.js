import { createStore } from 'redux';

// Action generators
const incrementCount = ({ incrementBy = 1 } = {}) => ({
	type: 'INCREMENT',
	incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
	type: 'DECREMENT',
	decrementBy
});

const setCount = ({ setTo } = {}) => ({
	type: 'SET',
	setTo
});

const resetCount = () => ({
	type: 'RESET'
});

// Reducers
// 1. Reducers are pure functions (just depend on their parameters, and sometimes their local variables)
// 2. Never change state or action

const countReducer = (state = { count: 0 }, action) => {
	switch (action.type) {
		case 'INCREMENT':
			return {
				count: state.count + action.incrementBy
			};
		case 'DECREMENT':
			return {
				count: state.count - action.decrementBy
			};
		case 'RESET':
			return {
				count: 0
			};
		case 'SET':
			return {
				count: action.setTo
			}
		default:
			return state;
	};
};

const store = createStore(countReducer);

// Fires every time the state changes
store.subscribe(() => {
	console.log(store.getState());
});

// Sending actions to the store
store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(setCount({ setTo: 101 }));
import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { addExpense } from '../actions/expenses';

const AddExpensePage = (props) => (
	<div>
		<h1>Add Expense</h1>
		<ExpenseForm
			onSubmit={(exp) => {
				props.dispatch(addExpense(exp));
				props.history.push('/');
			}}
		/>
	</div>
);

export default connect()(AddExpensePage);
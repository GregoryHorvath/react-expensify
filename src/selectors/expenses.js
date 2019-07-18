import moment from 'moment';

// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => { // decomposed 'filters'
	return expenses.filter((exp) => {
		const createdAtMoment = moment(exp.createdAt);
		const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
		const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true;
		const textMatch = exp.description.toLowerCase().includes(text.toLowerCase());

		return startDateMatch && endDateMatch && textMatch; // if all are true, it will be returned
	}).sort((a, b) => {
		if (sortBy === 'date') {
			return a.createdAt < b.createdAt ? 1 : -1;
		} else if (sortBy === 'amount') {
			return a.amount < b.amount ? 1 : -1;
		}
	});
};

export default getVisibleExpenses;
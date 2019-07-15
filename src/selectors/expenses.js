// Get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => { // decomposed 'filters'
	return expenses.filter((exp) => {
		const startDateMatch = typeof startDate !== 'number' || exp.createdAt >= startDate;
		const endDateMatch = typeof endDate !== 'number' || exp.createdAt <= endDate;
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
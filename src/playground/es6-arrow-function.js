const square = function (x) {
	return x * x;
}

const squareArrow = (x) => x * x;

console.log(square(8));
console.log('Arrow: ', squareArrow(4));

const getFirstName = (fullName) => fullName.split(' ')[0];
console.log(getFirstName('asd qwe'));
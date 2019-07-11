var nameVar = 'Greg';
var nameVar = 'Mike'; // can be reassigned
console.log('nameVar', nameVar);

let nameLet = 'Jen';
nameLet = 'Julie'; // can't be reassigned
console.log('nameLet', nameLet);

const nameConst = 'Frank';
//nameConst = 'Gunter'; // not working, can't even reassign
console.log('nameConst', nameConst);

// Block scoping

var fullName = 'Gregory Béla';

if (fullName) {
	let firstName = fullName.split(' ')[0];
	console.log(firstName);
}
//console.log(firstName); // not working, would work only with 'var'
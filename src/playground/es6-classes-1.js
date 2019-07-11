class Person {
	constructor(name = 'Anonymous', age = 0) {
		this.name = name;
		this.age = age;
	}
	getGreeting() {
		return `Hi. I am ${this.name}!`;
	}
	getDescription() {
		return `${this.name} is ${this.age} year(s) old.`;
	}
};

class Student extends Person {
	constructor(name, age, major) {
		super(name, age); // calls Person's constructor with the passed parameters
		this.major = major;
	}
	hasMajor() {
		return !!this.major;
	}
	// override
	getDescription() {
		let description = super.getDescription(); // parent's method

		if (this.hasMajor()) {
			description += ` Their major is ${this.major}.`;
		}

		return description;
	}
}

class Traveler extends Person {
	constructor(name, age, homeLocation) {
		super(name, age);
		this.homeLocation = homeLocation;
	}
	getGreeting() {
		let greeting = super.getGreeting();

		if (this.homeLocation) {
			greeting += ` I am visiting from ${this.homeLocation}.`;
		}

		return greeting;
	}
}

const me = new Traveler('Gregory', 29, 'Budapest');
console.log(me.getGreeting());

const other = new Student();
console.log(other);
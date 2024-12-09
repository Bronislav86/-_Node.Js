function generateRandomNumber(length = 1) {
	const min = Math.pow(10, length - 1);
	const max = Math.pow(10, length) - 1;

	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomDate(start, end) {
	if (!(start instanceof Date) || !(end instanceof Date)) {
		throw new Error("Both start and end must be valid Date objects.");
	}
	if (start > end) {
		throw new Error("Start date must be before end date.");
	}

	const randomTimestamp = Math.random() * (end.getTime() - start.getTime()) + start.getTime();
	return new Date(randomTimestamp);
}

function generateRandomName() {
	const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah", "Chris", "Jessica", "Daniel", "Ashley"];
	const lastNames = [
		"Smith",
		"Johnson",
		"Brown",
		"Williams",
		"Jones",
		"Garcia",
		"Miller",
		"Davis",
		"Martinez",
		"Hernandez",
	];

	const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
	const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

	return `${randomFirstName} ${randomLastName}`;
}

module.exports = { generateRandomNumber, generateRandomDate, generateRandomName };

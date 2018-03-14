const testA = (req, res)=> {
	const obj = {
		name: "Balu",
		number: 66666668
	}
	res.json(obj);
};

const testB = (req, res)=> {
	const obj2 = {
		name: "vivek",
		number: 88888888
	}
	res.json(obj2);
};

module.exports = {
	testA,
	testB
};


const condition = (req, count)=> {
	let number;
	if(req && count<9) {
		number = "0000";
	}
	else if(req && count<99){
		number = "000"
	} else if(req && count<999) {
		number = "00"
	} else if(req && count<9999) {
		number = "0" 
	}
	else {
		console.log(`exceeded ${count}`);
	}
	return number;
};

const increment = (role, req, res, count) => {
	let value;
	if(req && count<9999) {
		count++;
		let num = condition(req, count);
		value = `${role}${req}${res}${num}${count}`;
	}
	return value;
};

module.exports = {
	increment
};
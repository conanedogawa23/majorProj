const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const testingDetails = new Schema({
	time: {
		type: Date,
		required: true
	}
});

const testing = mongoose.model("Testing", testingDetails); 
module.exports = {
	testing
};
console.log("test schema");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const OrderDetails = new Schema ({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'Admin'
	},
	drop: {
		type: String,
		index: {
			unique: false
		}
	},
});

// TestDetails.pre("save", function(next) {
// 	let adSave = this;
//     	bcrypt.hash(adSave.password, 10).then((hash) => {
// 	        adSave.password = hash; //if there is no error we are going to hash
// 	        next();
// 	    }).catch((err) => {
// 	    	console.log("password not hashed :"+err);
// 	    });
// });	

const OrderTest = mongoose.model("OrderTest", OrderDetails);

module.exports = {
	OrderTest
};
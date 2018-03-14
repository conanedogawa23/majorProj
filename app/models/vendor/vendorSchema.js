console.log("in vendor schema");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const VendorFields = new Schema({
	eId: {
		type: Number,
	},
	username: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	password: {
		type: String,
		required: true,
		selected: false
	},
	email: {
		type: String,
		required: true
	},
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	phoneNumber: {
		type: Number,
		required: true
	},
	businessName: {
		type: String,
		required: true
	},
	businessAddress: {
		type: String,
		required: true
	}
});

VendorFields.pre('save', function (next){
	let venSave = this;
    	bcrypt.hash(venSave.password, 10).then((hash) => {
	        venSave.password = hash; //if there is no error we are going to hash
	        console.log("into this as vendor");
	        next();
	    }).catch((err) => {
	    	console.log("password not hashed :"+err);
	    });
});

VendorFields.methods.comparePassword = function (pwd) {
	const venUser = this;
	return bcrypt.compareSync(pwd, venUser.password);
};

const Vendor = mongoose.model("Vendor", VendorFields);

module.exports = {
	Vendor
};
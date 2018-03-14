console.log("in adminSchema");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const AdminDetails = new Schema({
	adminUsername: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	adminPassword: {
		type: String,
		required: true,
		selected: false
	},
	adminFirstName: {
		type: String
	},
	adminLastName: {
		type: String
	},
	adminEmail: {
		type: String,
		required: true
	},
	adminId: {
		type: String,
		required: true
	}
});

AdminDetails.pre('save', function (next){
	let adSave = this;
    	bcrypt.hash(adSave.adminPassword, 10).then((hash) => {
	        adSave.adminPassword = hash; //if there is no error we are going to hash
	        next();
	    }).catch((err) => {
	    	console.log("password not hashed :"+err);
	    });
});

AdminDetails.methods.comparePassword = function (pwd) {
	const adminUser = this;
	return bcrypt.compareSync(pwd, adminUser.adminPassword);
};

const Admin = mongoose.model("Admin", AdminDetails);
module.exports = {
	Admin
};
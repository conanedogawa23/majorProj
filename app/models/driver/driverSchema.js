console.log("in driver schema");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DriverDetails = new Schema ({
	driverPhoneNumber: {
		type: String,
		required: true
	},
	driverUsername: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	driverPassword: {
		type: String,
		required: true,
		selected: false
	},
	driverId: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	driverFirstName: {
		type: String,
	},
	driverLastName: {
		type: String,
	},
	driverEmail: {
		type: String,
		required: true
	},
	driverLicenceNumber: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
	driverVehicleNumber: {
		type: String,
		required: true
	}
});

DriverDetails.pre('save', function (next){
	let driverSave = this;
    	bcrypt.hash(driverSave.driverPassword, 10).then((hash) => {
	        driverSave.driverPassword = hash; //if there is no error we are going to hash
	        next();
	    }).catch((err) => {
	    	console.log("password not hashed :"+err);
	    });
});

DriverDetails.methods.comparePassword = function (pwd) {
	const driverUser = this;
	return bcrypt.compareSync(pwd, driverUser.driverPassword);
};

const Driver = mongoose.model("Driver", DriverDetails);
module.exports = {
	Driver
};
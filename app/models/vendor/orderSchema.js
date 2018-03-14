const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderConfirm = new Schema({
	userID : {
		type: String,
		ref: 'Vendor',
		required: true
	},
	orderID: {
		type: String,
		index: {
			unique: true
		}
	},
	driverName: {
		type: String,
		ref: 'Driver',
		default: "RAJU"
	},
	pickup: {
		type: String,
		ref: 'OrderVendor'
	},
	drop: {
		type: String,
		ref: 'OrderVendor'
	},
	schedule: {
		type: String,
		ref: "OrderVendor"
	},
	time: {
		type: Date,
		ref: "OrderVendor"
	},
	status: {
		type: Boolean,
		required: true,
		default: true
	},
	driverLicenseNumber: {
		type: String,
		ref: 'Driver',
		required: true,
		default: "RAJU1234LICENSE"
	},
	vehicleRegistrationNumber: {
		type: String,
		ref: 'Driver',
		required: true,
		default: "RAJU12345VEHICLENUMBER"
	},
	arrivalTime: {
		type: Date,
	},
	customerName: {
		type: String,
		ref: 'OrderVendor'
	},
	details: {
		type: String,
		ref: 'OrderVendor'
	},
	driverPhoneNumber: {
		type: String,
		ref: 'Driver',
		default: '+1 (248) 841-6470'
	},
	tips: {
		type: Number,
		default: "5"
	},
	customerNum: {
		type: Number,
	},
	specInstruct: {
		type: String
	},
	reasonForCancel: {
		type: String
	}
});

const VendorOrderConfirm = mongoose.model('VendorOrderConfirm', OrderConfirm);

module.exports = {
	VendorOrderConfirm
};
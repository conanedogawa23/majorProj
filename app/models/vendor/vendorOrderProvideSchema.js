console.log("in order schema");

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const OrderDetails = new Schema({
	pickupLocation: {
		type: String,
		required: true
	},
	dropLocation: {
		type: String,
		required: true
	},
	packageType: {
		type: String,
		required: true
	},
	deliveryType: {
		type: String,
		required: true
	},
	paymentMethod: {
		type: String,
		required: true,
		default: "contract"
	},
	useridVendor: {
		type: String,
		ref: 'Admin',
		required: true
	},
	packageTime: {
		type: Date,
		default: Date.now,
	},
	customerName: {
		type: String,
		required: true
	},
	customerNumber: {
		type: String,
		required: true
	},
	addrDetails: {
		type: String,
	},
	specInstruc: {
		type: String,
	},
	reqID: {
		type: String,
		index: {
			unique: true
		},
		required: true
	}
});

const OrderVendor = mongoose.model("OrderVendor", OrderDetails);

module.exports = {
	OrderVendor
};
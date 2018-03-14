const mongoose = require("mongoose");
const schema = mongoose.Schema;

const invoiceVendor = new schema ({
	userInvID: {
		type: String,
		ref: 'Vendor',
		// required: true
	},
	invID: {
		type: String,
		// required: true,
		index: {
			unique: true
		}
	},
	invStartDate: {
		type: Date,
		// required: true
	},
	invEndDate: {
		type: Date,
		// required: true
	},
	invBillDue: {
		type: Number,
		// required: true
	},
	invBillPaid: {
		type: Number,
		// required: true
	},
	invBillStatus: {
		type: Boolean,
		// required: true,
		default: true
	},
	invNumOrders: {
		type: Number,
		// required: true,
		default: 0
	}
});

const invVendor = mongoose.model('invVendor',invoiceVendor);

module.exports = {
	invVendor	
};
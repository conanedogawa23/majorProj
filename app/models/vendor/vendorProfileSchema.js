const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorProfileSchema = new Schema ({
	vendorId: {
		type: Schema.Types.ObjectId,
		ref: 'Vendor',
		required: true
	},
	favouriteLocation:[{
		area: String,
		areaNum: Number
	}],
	// img: { 
	// 	data: Buffer, 
	// 	contentType: String 
	// }
});

const vendorProfile = mongoose.model('VendorProfile', vendorProfileSchema);

module.exports = {
	vendorProfile
};
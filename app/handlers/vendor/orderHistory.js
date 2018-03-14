const orderFind = require("../../models/vendor/orderSchema");
const vendorOrder = require("../../models/vendor/vendorOrderProvideSchema");

var orders = [];

const orderHistory = (req, res) => {
	orderFind.VendorOrderConfirm.find({
		userID: req.decoded.id
	}).then((data)=> {
		// vendorSort(data);
		res.json(data);
	}).catch((err) => {
		console.log(err);
		res.json({message: "check the error in orderHistory"});
	});
};

module.exports = {
	orderHistory
};
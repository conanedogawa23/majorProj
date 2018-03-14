const vendorOrderConfirmed = require("../../models/vendor/orderSchema");

const orderDetailEach = (req, res) => {
	vendorOrderConfirmed.VendorOrderConfirm.find({
		orderID: req.body.orderId
	}).then((data)=> {
		console.log(data);
		res.json(data[0]);
	}).catch((err)=> {
		console.log(err);
	});
};

module.exports = {
	orderDetailEach
}
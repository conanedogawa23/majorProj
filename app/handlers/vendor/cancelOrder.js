const mongo = require("mongodb").MongoClient;
const config = require("../../../config.js");
const urL = config.database;

const cancelOrder = (req, res) => {
	mongo.connect(urL, (err, db) => {
		if(err) return err;

		console.log("connected successfully in cancel order");
		const reasonForCancelling = req.body.reason;
		db.collection('vendororderconfirms')
		.updateOne({orderID: req.body.orderId}, {$set:{status: false, requestForCancel: reasonForCancelling}})
		.then((data)=> {
			console.log("updated successfully");
			res.json(data);
		}).catch((err)=>{
			console.log(err);
		});
	});
	console.log({message: "cancelling the order"});
};

module.exports = {
	cancelOrder
};
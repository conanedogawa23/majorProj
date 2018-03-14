const mongo = require("mongodb").MongoClient;
const config = require("../../../config.js");
const urL = config.database;
const objectID = require("mongodb").ObjectID;

const cancelledOrder = (req, res) => {
	mongo.connect(urL, (err, db) => {
		if(err) return err;
		db.collection('vendororderconfirms').find({ userID:req.decoded.id, status: false, orderID: req.body.orderId}).toArray((err, result)=>{
			if(err) console.log(err);
			console.log(result);
			res.json(result);
		});
	});
	console.log({message: "Order details which are cancelled"});
};

module.exports = {
	cancelledOrder
};
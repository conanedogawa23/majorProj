
const vendorDetails = require("../../models/vendor/vendorSchema");
const vendorInvoice = require("../../models/vendor/vendorInvoiceSchema");
const idGeneratorInv = require("./invIDGenerator");
const mongo = require("mongodb").MongoClient;
const config = require("../../../config");
const murl = config.database;
const objectID = require("mongodb").ObjectID;

const invoiceDetails = (req, res)=> {
	let id = new objectID(req.decoded.id);
	console.log(req.decoded.id);
	mongo.connect(murl).then((db)=> {
		db.collection("vendors").find({"_id": id}).toArray((err, value)=> {
			let vendorInfo = value[0];
			console.log(value);
			db.collection("vendororderconfirms").find({userID: req.decoded.id}).toArray((err, orders)=> {
				let len = orders.length;
				len = orders[len-1].time
				console.log(len.toString());
				db.collection("invvendors").find({userInvID: req.decoded.id}).toArray((err, vInv)=>{
					let invoiceData = {
						vInv,
						vendorInfo,
						orders
					};
					res.json(invoiceData);	
				});
			});
		});
	}).catch((err)=> {
		console.log(err);
	});
};

module.exports = {
	invoiceDetails
};
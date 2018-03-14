console.log("pick and drop address js page");

const vendorOrder = require("../../../models/vendor/vendorOrderProvideSchema");
const idGeneratorInv = require("../invIDGenerator");

const config = require("../../../../config");
const mongo = require("mongodb").MongoClient;
const secretKey = config.secretKey;
const url = config.database;

const vendorDetails = (req, res) => {

	const vDetails = new vendorOrder.OrderVendor();
	vDetails.pickupLocation = req.body.pickup;
	vDetails.dropLocation = req.body.drop;
	vDetails.packageType = req.body.type;
	vDetails.deliveryType = req.body.delivery;
	vDetails.useridVendor = req.decoded.id;
	vDetails.customerName = req.body.cName;
	vDetails.customerNumber = req.body.cNumber;
	vDetails.addrDetails = req.body.addrDetails;
	vDetails.specInstruc = req.body.instructions;
	vDetails.packageTime = req.body.time;

	vDetails.save()
		.then((data)=> {
		res.json(data);
	}).catch((err)=> {
		res.json(`Vdetails failed : ${err}`);
	});

};

const showDetails = (req, res)=> {
	console.log("testing in pick and drop");
	res.json("testing in pick and drop");
};

const appendDetails = (req, res)=> {
	mongo.connect(url)
		.then((db)=> {
			db.collection("ordervendors").find({useridVendor: req.decoded.id}).toArray((err, result)=> {
					// res.json("kya re bhai");
				// res.json(result);
				let requestId = "";
				let storeArea = "MI";
				let storeName = "SHA";
				if(result.length==0) {
					requestId = `R${storeName}${storeArea}00001`;
				} else {
					let count = result.length;
						count = result[count-1].reqID;
						count = count.slice(6, 11);
					let ridValue =  parseInt(count);
					let roleVendorReq = "R";
					requestId = idGeneratorInv.increment(roleVendorReq, storeName, storeArea, ridValue);
					// res.json(requestId);
				}
				const vDetails = new vendorOrder.OrderVendor();
				vDetails.pickupLocation = req.body.pickup;
				vDetails.dropLocation = req.body.drop;
				vDetails.packageType = req.body.type;
				vDetails.deliveryType = req.body.delivery;
				vDetails.useridVendor = req.decoded.id;
				vDetails.customerName = req.body.cName;
				vDetails.customerNumber = req.body.cNumber;
				vDetails.addrDetails = req.body.addrDetails;
				vDetails.specInstruc = req.body.instructions;
				vDetails.packageTime = req.body.time;
				vDetails.reqID = requestId;

				vDetails.save()
					.then((data)=> {
					res.json(data);
				}).catch((err)=> {
					res.json(`Vdetails failed : ${err}`);
				});
			});
		}).catch((err)=> {
			console.log("error in db");
		});
};

module.exports = {
	vendorDetails,
	appendDetails,
	showDetails
};
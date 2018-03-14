console.log("in order generate");
const vendorOrderConfirmed = require("../../../models/vendor/orderSchema");
const testOrder = require("../../../models/testSchema");
const vendorOrder = require("../../../models/vendor/vendorOrderProvideSchema");
const idGeneratorInv = require("../invIDGenerator");

const mongo = require("mongodb").MongoClient;
const config = require("../../../../config");
const Url = config.database;

const orderGenerate = (req, res) => {
	vendorOrder.OrderVendor.find({
			useridVendor: req.decoded.id	
	}).then((data)=> {
		let pd = data;
		console.log(pd.length);
		vendorOrderConfirmed.VendorOrderConfirm.find({
			userID: req.decoded.id
		}).then((data)=> {
			const orders = data;
			const storeArea = req.body.storeArea;
			const storeName = req.body.storeName;
			let orderId = "";
			if(orders.length==0)
			{
				orderId = `${storeName}${storeArea}00001`;
			} else {
				let count = orders.length;
				let id = orders[count-1].orderID;
				let slicedId = id.slice(5, 10);
				let idValue =  parseInt(slicedId);
				orderId = idGeneratorInv.increment("", storeName, storeArea, idValue);
			}
			const generatedOrder = new vendorOrderConfirmed.VendorOrderConfirm();
			
			generatedOrder.pickup = pd[0].pickupLocation;
			generatedOrder.drop = pd[0].dropLocation;
			generatedOrder.schedule = pd[0].packageType;
			generatedOrder.time = pd[0].packageTime;
			generatedOrder.details = pd[0].addrDetails;
			generatedOrder.customerName = pd[0].customerName;
			generatedOrder.customerNum = pd[0].customerNumber;
			generatedOrder.specInstruct = pd[0].specInstruc;
			generatedOrder.orderID = orderId;
			generatedOrder.userID = req.decoded.id;

			generatedOrder.save()
			.then((data)=> {
				res.json(data);
			}).catch((err)=> {
				res.json(err);
				console.log(err);
			});
		}).catch((err)=> {
			console.log(err);
		});

	}).catch((err)=> {
		console.log(err);
	});
};

module.exports = {
	orderGenerate
};
console.log("in the invoice page");
const vendorDetails = require("../../models/vendor/vendorSchema");
const vendorInvoice = require("../../models/vendor/vendorInvoiceSchema");
const idGeneratorInv = require("./invIDGenerator");
const mongo = require("mongodb").MongoClient;
const config = require("../../../config");
const murl = config.database;
const objectID = require("mongodb").ObjectID;

// const condition = (req, count)=> {
// 	let number;
// 	if(req && count<9) {
// 		number = "0000";
// 	}
// 	else if(req && count<99){
// 		number = "000"
// 	} else if(req && count<999) {
// 		number = "00"
// 	} else if(req && count<9999) {
// 		number = "0" 
// 	}
// 	else {
// 		console.log(`exceeded ${count}`);
// 	}
// 	return number;
// };

// const increment = (role, req, res, count) => {
// 	let value;
// 	if(req && count<9999) {
// 		count++;
// 		console.log(count);
// 		let num = idGeneratorInv.condition(req, count);
// 		value = `${role}${req}${res}${num}${count}`;
// 	}
// 	console.log("the value of increment in invoice is "+value);
// 	return value;
// };

const invoiceGenerate = (req, res)=> {
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
					let invId = "";
					let storeName = "Rh";
					let storeArea = "ER";
					let lenInv = vInv.length;
					// res.json(lenInv);
					if(vInv.length==0) {
						invId = `I${storeName}${storeArea}00001`;
					} else {
						let count = vInv.length;
							count = vInv[count-1].invID;
							count = count.slice(6, 11);
						let vIdInv =  parseInt(count);
						let roleVendor = "I";
						invId = idGeneratorInv.increment(roleVendor, storeName, storeArea, vIdInv);
					}

					let invoiceDetailsVendor = new vendorInvoice.invVendor();
					invoiceDetailsVendor.invBillDue = req.body.billDue;
					invoiceDetailsVendor.invBillPaid = req.body.billPaid;
					invoiceDetailsVendor.invStartDate = new Date(req.body.startDate);
					invoiceDetailsVendor.invEndDate = new Date(req.body.endDate);
					invoiceDetailsVendor.invNumOrders = orders.length;
					invoiceDetailsVendor.invID = invId;
					invoiceDetailsVendor.userInvID = req.decoded.id;

					invoiceDetailsVendor.save().then((data)=> {
						res.json(data);
					}).catch((err)=> {
						res.json('not saved');
						console.log(err);
					});	
				});
			});
		});
	}).catch((err)=> {
		console.log(err);
	});
};

module.exports = {
	invoiceGenerate
};
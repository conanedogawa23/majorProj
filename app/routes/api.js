 console.log("in api.js");

const jwt = require("jsonwebtoken");

const config = require("../../config");
const secretKey = config.secretKey;

const createVendor = require("../handlers/vendor/createVendor.js");
const createAdmin = require("../handlers/admin/createAdmin.js");
const createDriver = require("../handlers/driver/createDriver.js");
const adminLogin = require("../handlers/admin/loginAdmin.js");
const vendorLogin = require("../handlers/vendor/loginVendor.js");
const vendorPD = require("../handlers/vendor/req_for_pickup/pick&drop_addr");
const testApi = require("../handlers/vendor/testOrderTracking");
const orderGenerateVendor = require("../handlers/vendor/req_for_pickup/orderGenerate");
const vendorProfileSave = require("../handlers/vendor/profile/vendorProfileDetailsSave");
const vendorCancelOrder = require("../handlers/vendor/cancelOrder");
const vendorCancelOrderDetails = require("../handlers/vendor/cancelOrderDetails");
const vendorOrderHistory = require("../handlers/vendor/orderHistory");
const vendorOrderDetails = require("../handlers/vendor/orderDetails");
const vendorInvoice = require("../handlers/vendor/vendorInvoice");
const vendorInvoiceDetails = require("../handlers/vendor/vendorInvoiceDetails"),
	test = require("../handlers/vendor/testapi");

module.exports = (app, express)=>{
	const api = express.Router();
	
	api.get("/", (req, res)=> {
		Admin.find({}, (err, users) => {
			if(err) {
				console.log(err);
			} else {
				console.log(users);
				res.send(users);
			}
		});
	});


	api.post("/createVendor", createVendor);
	api.post("/createAdmin", createAdmin);
	api.post("/createDriver", createDriver);
	api.post("/adminLogin", adminLogin);
	api.post("/vendorLogin", vendorLogin);

	// api.use((req, res, next) => {
	// 	const token = req.body.token;
	// 	if(token) {
	// 		jwt.verify(token, secretKey, function (err, decoded) {
	// 			if(err) {
	// 				res.status(403).send({ success: false, message: "failed to authenticate"});
	// 			} else {
	// 				req.decoded = decoded;
	// 				next();
	// 			}
	// 		});
	// 	} else {
	// 		res.status(403).send({ success: false, message: "no token generated"});
	// 	}
	// });

	api.get('/me', (req, res) => {
		res.json(req.decoded);
	});

	api.post('/test', test.trial);
	api.post('/testing', testApi.testB);
	api.post("/vendorPD", vendorPD.vendorDetails);
	api.post("/vendorPappend", vendorPD.appendDetails);
	api.post("/vendorCancelOrder", vendorCancelOrder.cancelOrder);
	api.post("/vendorCancelOrderDetails", vendorCancelOrderDetails.cancelledOrder);
	api.post("/vendorOrderHistory", vendorOrderHistory.orderHistory);
	api.post("/orderGenerate", orderGenerateVendor.orderGenerate);
	api.post("/vendorOrderDetails", vendorOrderDetails.orderDetailEach);
	api.post("/vendorInvoice",vendorInvoice.invoiceGenerate);
	api.post("/vendorInvoiceDetails",vendorInvoiceDetails.invoiceDetails);

	// api.post('/testing', (req, res)=> {
	// });

	api.post("/vendorProfileSave", vendorProfileSave.profileView);

	return api;
}
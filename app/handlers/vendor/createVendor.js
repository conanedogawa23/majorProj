console.log("in create vendor");
const vendor = require("../../models/vendor/vendorSchema");
module.exports = (req, res) => {
	const vendorUser = new vendor.Vendor ({
		username: req.body.username,
		password: req.body.password,
		firstName: req.body.firstname,
		lastName: req.body.lastname,
		email: req.body.email,
		eId: req.body.eid,
		phoneNumber: req.body.phonenumber,
		businessName: req.body.businessname,
		businessAddress: req.body.businessaddress
	});

	vendorUser.save()
			.then((data)=> {
				console.log(vendorUser);
				console.log("vendor saved");
				res.json({message: "createVendor api successful"});
			})
			.catch((err)=> {
				console.log(err);
				res.json({message: "vendor not saved"});
			});
};
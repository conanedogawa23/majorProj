console.log("in driver create");
const Driver = require("../../models/driver/driverSchema");

module.exports = (req, res) => {
	const driverDetails = new Driver.Driver({
		driverName: req.body.name,
		driverPhoneNumber: req.body.phNumber,
		driverUsername: req.body.username,
		driverPassword: req.body.password,
		driverId: req.body.id,
		driverFirstName: req.body.firstname,
		driverLastName: req.body.lastname,
		driverEmail: req.body.email,
		driverLicenseNumber: req.body.licensenumber,
		driverVehicleNumber: req.body.vehiclenumber
	});

	driverDetails.save()
				.then(()=> {
					console.log("driver details saved");
					res.json({message: "driver saved"});
				}).catch((err)=> {
					console.log("error");
					res.json({message: "driver not saved"});
				});
};
console.log("in create Admin");
const Admin = require("../../models/admin/adminSchema");
module.exports = (req, res) => {
	
	const adminUser = new Admin.Admin ({
		adminUsername: req.body.username,
		adminPassword: req.body.password,
		adminFirstName: req.body.firstname,
		adminLastName: req.body.lastname,
		adminEmail: req.body.email,
		adminId: req.body.id
	});

	adminUser.save()
			.then(()=> {
				console.log(adminUser);
				console.log("admin saved");
				res.json({message: "admin details saved"});
			})
			.catch((err)=> {
				console.log("error in saving admin");
				res.json({message: "admin not saved"});
			});
};
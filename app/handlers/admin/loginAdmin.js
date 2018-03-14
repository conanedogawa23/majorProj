const Admin = require("../../models/admin/adminSchema");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const secretKey = config.secretKey;

function createToken (user) {
	const token = jwt.sign({
		id: user._id,
		username: user.username,
		lastname: user.lastname
	}, secretKey);
	return token;
};

module.exports = (req, res) => {
	Admin.Admin.findOne({ 
		adminEmail: req.body.email
	},'adminPassword', function(err, user) {
		const adminJSON = JSON.parse(JSON.stringify(user));
		if(err) return err;
		if(!user) {
			return res.json({ message: " he is not admin" });
		} else if(user) {
			const validatePassword = user.comparePassword(req.body.password);
			if(!validatePassword) {
				console.log("enter correct password");
				res.json({ message: "enter correct password" });
			} else {
				const token = createToken(adminJSON);
				res.json({
					success: true,
					message: "Admin logged in",
					token: token
				});
			}
		}
	});
};
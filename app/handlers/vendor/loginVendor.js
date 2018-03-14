console.log("in vendor login");
const Vendor = require("../../models/vendor/vendorSchema");
const jwt = require("jsonwebtoken");
const config = require("../../../config");
const secretKey = config.secretKey;

function createToken (user) {
	const token = jwt.sign({
		id: user._id,
		username: user.username,
		email: user.email
	}, secretKey);
	return token;
};

module.exports = (req, res) => {
	Vendor.Vendor.findOne({ 
		username: req.body.username
	},'password', function(err, user) {
		const vendorJSON = JSON.parse(JSON.stringify(user));
		if(err) return err;
		if(!user) {
			return res.json({ message: " he is not vendor" });
		} else if(user) {
			const validatePassword = user.comparePassword(req.body.password);
			if(!validatePassword) {
				console.log("enter correct password");
				res.json({ message: "enter correct password" });
			} else {
				const token = createToken(vendorJSON);
				res.json({
					success: true,
					message: "Vendor logged in",
					token: token
				});
			}
		}
	});
};
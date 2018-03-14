const testing = require("../../models/testingSchema");
const config = require("../../../config");
const mongo = require("mongodb").MongoClient;
const secretKey = config.secretKey;
const uri = config.database,
	fsR = require("fs");

const trailing = (req, res)=> {
	console.log("in trail2");
	res.json("in trail2");
};

const trial = (req, res) => {
	let form = "jkv";
	console.log(form);
	res.json(form);
};

module.exports = {
	trial
};

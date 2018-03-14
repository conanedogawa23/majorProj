const vendorProfile = require("../../../models/vendor/vendorSchema");
const vendorProfileData = require("../../../models/vendor/vendorProfileSchema");
const fsR = require("fs");
const mongodb = require("mongodb").MongoClient;
const grid = require('gridfs-stream');
const config = require("../../../../config");
const uri = config.database;

const profileView = (req, res) => {
	// console.log(req.decoded.id);
	// vendorProfile.Vendor.find({
	// 	username: req.body.username
	// }).then((data)=> {
	// 	// console.log(data);
	// 	res.json(data);
	// }).catch((err)=> {
	// 	console.log(err);
	// 	res.json({message:"profile is not correct"});
	// });
	let imgPath = 'F:/bagdkart/bagdkart-back-end/folder/IMG_0089.png';

	let arrayLocations = [{
			area: "kothapet",
			areaNum: 1
		},
		{
			area: "nagole",
			areaNum: 2
		},
	];

	mongodb.connect(uri, (err, db)=> {
		if(err) return err;

		console.log("connection established");

	    let bucket = new GridFSBucket(db, {
            chunkSizeBytes: 1024,
            bucketName: 'images'
        });
	 	
	 	if(bucket){
	 		console.log("we have a bucket");
	 	} else {
	 		console.log("we dont have a bucket");
	 	}
	});
	// let arrayCheck = new vendorProfileData.vendorProfile();
	// arrayCheck.vendorId = req.decoded.id;
	// arrayCheck.favouriteLocation = arrayLocations;
	// res.send(arrayCheck);

};

module.exports = {
	profileView
};
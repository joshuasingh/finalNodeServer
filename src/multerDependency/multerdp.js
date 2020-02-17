// working with photo uploading to aws
const aws = require("aws-sdk");
module.exports.multer = require("multer");
module.exports.multerS3 = require("multer-s3");
var config = require("../security/config.json");

aws.config.update({
  secretAccessKey: config.awsKey.AWSSecretKey,
  accessKeyId: config.awsKey.AWSAccessKeyId,
  region: "ap-south-1"
});

module.exports.s3 = new aws.S3();

const dotenv = require('dotenv')
const path = require('path')
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')
const Logger = require('./logger')

dotenv.config({
  path: path.join(__dirname,'../../../.env'),
})

const bucketName = process.env.S3_AVATAR_NAME
const region = process.env.S3_AVATAR_REGION
const accessKeyId = process.env.S3_AVATAR_ACCESS_KEY
const secretAccessKey = process.env.S3_AVATAR_SECRET_KEY

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
  Logger.info('S3 uploading avatar')
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }

  return s3.upload(uploadParams).promise()
}
//exports.uploadFile = uploadFile


// downloads a file from s3
function getFileStream(fileKey) {
  Logger.info('S3 fetching avatar')
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName
  }
  return s3.getObject(downloadParams).createReadStream()
}
//exports.getFileStream = getFileStream


module.exports = {
  getFileStream,
  uploadFile
}
const AWS = require('aws-sdk');
const path = require('path');

AWS.config.update({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
    region: process.env.Region
})

const uploadToS3 = async ({file, s3path, maxSize, allowedExts}) => {
    const fileExt = file.name.split(".").pop()

    if (!allowedExts.includes(fileExt.toLowerCase())) return ""

    if (file.size > maxSize) return ""

    const params = {
        Bucket: process.env.Bucket,
        Body: file.data,
        Key: `${s3path}/${path.basename(file.name)}`
    }

    const s3 = new AWS.S3({
        apiVersion: "2006-03-01",
        params
    })

    await s3.upload(params, function(err, data) {
        if (err) {
            console.log("Err s3", err);
        }

        if (data) {
            return data.Location
        }
    })
    return `https://${process.env.Bucket}.s3.amazonaws.com/${s3path}/${path.basename(file.name)}`
}

module.exports = uploadToS3
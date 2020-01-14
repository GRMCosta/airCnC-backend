const mongoose = require('mongoose');
const aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const s3 = new aws.S3();

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    url_image: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

SpotSchema.pre('save', function(){
    if(!this.url_image){
        this.url_image = `${process.env.APP_URL}/files/${this.thumbnail}`;
    }
})

SpotSchema.pre('remove', function(){
    if(process.env.STORAGE_TYPE === "s3"){
        return s3.deleteObject({
            Bucket: "uploadmyexample",
            key: this.thumbnail
        }).promise();
    }else{
        return promisify(fs.unlink)(
            path.resolve(__dirname, '..','..','uploads', this.thumbnail)
        );
    }
})

module.exports = mongoose.model('Spot', SpotSchema);
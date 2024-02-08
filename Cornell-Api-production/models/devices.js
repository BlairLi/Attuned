const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = require('../models/users');
const deviceSchema = new Schema({
    deviceToken: String,
    deviceId:String,
    deviceType: String,
    appVersion: String,
    badge: String,
    userId:  {type: Schema.Types.ObjectId,ref: user},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let Device = mongoose.model('Device',deviceSchema)

module.exports = Device;

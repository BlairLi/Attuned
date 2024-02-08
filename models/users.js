const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const question = require('../models/questions');
const userSchema = new Schema({
    name: String,
    password:{type: String, required: true},
    gender: Number,
    DOB: Date,
    email: {type: String, required: true},
    countryCode: Number,
    telephone:  String,
    OTP: Number, 
    otpExpiresIn: String,
    admin: {type: Boolean, required: true},
    resetPasswordToken: String,
    accessToken: String,
    otpVerified: Boolean,
    verifyEmailToken: String,
    isEmailVerified:Boolean,
    isDeleted:{type:Boolean,default:false},
    recordingCount:{type:Number},
    isPushNotificationEnabled:{type:Boolean,default:true},
    isCallNotificationEnabled:{type:Boolean,default:true},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
    /*answers:Array*/
});

let User = mongoose.model('User',userSchema)

module.exports = User;

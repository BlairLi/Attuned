const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const accessCodeSchema = new Schema({
    accessCode: {type:String,required:true},
    isEnabled:{type:Boolean,required:true},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let AccessCode = mongoose.model('AccessCode',accessCodeSchema)

module.exports = AccessCode;

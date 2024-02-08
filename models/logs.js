const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const logSchema = new Schema({
    APIName:{type:String, required:true},
    request:{type:String,required:true},
    response:{type:String,required:true},
    createdAt:{type:Date,default:new Date()},
    updatedAt:{type:Date,default:new Date()}
});

let Logs = mongoose.model('Logs',logSchema)

module.exports = Logs;

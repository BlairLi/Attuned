const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testModels = new Schema({
    serverTime:{type:String, required:true},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let testModel = mongoose.model('testModel',testModels)

module.exports = testModel;

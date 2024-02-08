const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderFrequency = new Schema({
    gender:{type:String, required:true},
    idealMinFrequency:{type:Number, required:true},
    idealMaxFrequency:{type:Number, required:true},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let GenderFrequency = mongoose.model('GenderFrequency',genderFrequency)

module.exports = GenderFrequency;

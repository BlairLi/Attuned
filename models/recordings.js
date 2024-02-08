const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordingSchema = new Schema({
    recordingName:{type:String,required:true},
    isDeleted:{type:Boolean,default:false},
    content:{type:String, required:true},
    duration:{type:Number},
    contentOrder:{type:Number},
    contentType:{type: String,enum : ['video','text'],default:'text',required: true},// if changed in future
    // genderFrequencyData:[{
    //     gender:{type:String, required:true},
    //     idealMinFrequency:{type:Number, required:true},
    //     idealMaxFrequency:{type:Number, required:true}
    // }],
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let Recording = mongoose.model('Recording',recordingSchema)

module.exports = Recording;

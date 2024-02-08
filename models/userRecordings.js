const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userRecordings = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    recordingTaskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recording'
    },
    recordingName: {type:String, required:true},
    recordingUrl:{type:String, required:true},
    duration:{type:Number},
    avgFrequency:{type:Number, required:true},
    minFrequency:{type:Number, required:true},
    maxFrequency:{type:Number, required:true},
    count : {type:Number, required:true},
    createdAt:{type:Date, default:new Date(),immutable: true},
    updatedAt:{type:Date, default:new Date()}
});
userRecordings.pre('save', function (next) {
    now = new Date();
    this.createdAt = now;
    this.updatedAt = now;
    // if(!this.createdAt) {
    //     this.createdAt = now
    // }
    next();
})
let userRecording = mongoose.model('userRecording',userRecordings)

module.exports = userRecording;

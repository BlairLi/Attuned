const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted:{type:Boolean,default:false},
    content:{type:String},
    reminderTime:{type:String,default:null,required: true},
    nextReminderTime : {type:String,default:null,required: true},
    repeatType:{type: String,enum : ['daily','week','month','year','never','allday','once'],default:'never',required: true},// if changed in future
    status:{type:Boolean,default:true},
    isAllDay:{type:Boolean,default:false},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let Reminder = mongoose.model('Reminder',reminderSchema)

module.exports = Reminder;

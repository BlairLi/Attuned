const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
    fromId: {type: String},
    toId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    message:{type: String, required: true},
    notificationType:{type: String,enum : ['push','email'],default:'push',required: true},
    resourceId:{type: String},
    isNewNotification : {type:Boolean,default:true},
    isRead : {type:Boolean,default:false},
    sentTo :{type: String,enum : ['user','admin'],default:'user',required: true},
    sentFrom : {type: String,enum : ['admin','user','app'],default:'admin',required: true},
    title : {type: String, required: true},
    type : {type: String, required: true},
    createdAt:{type:Date, default:Date.now(),immutable: true},
    updatedAt:{type:Date, default:Date.now()}
});

// notificationSchema.pre('save', function (next) {
//     now = Date.now();
//     console.log("in presave hook",now)
//     this.createdAt = now;
//     this.updatedAt = now;
//     // if(!this.createdAt) {
//     //     this.createdAt = now
//     // }
//     next();
// })

let Notification = mongoose.model('Notification',notificationSchema)

module.exports = Notification;

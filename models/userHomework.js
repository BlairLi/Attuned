const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userHomeworkSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    exerciseId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homework'
    },
    isCompleted: {type:Boolean},
    isEnabled:{type:Boolean},
    isFeedBack:{type:Boolean},
    feedBack:{type:Boolean},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let UserHomework = mongoose.model('UserHomework',userHomeworkSchema)

module.exports = UserHomework;

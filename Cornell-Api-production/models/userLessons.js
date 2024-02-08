const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userLessons = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lessonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    isCompleted: {type:Boolean},
    isEnabled:{type:Boolean},
    isFeedBack:{type:Boolean},
    feedBack:{type:Boolean},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let UserLesson = mongoose.model('UserLesson',userLessons)

module.exports = UserLesson;

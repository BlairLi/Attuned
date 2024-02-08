const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const answerSchema = new Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    questionId:{
        type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
    },
    questionOptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuestionOptions'
    },
    otherAnswer:{
        type:String
    },
    isCompleted: {
        type: Number,
        default:0
    },
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let Answer = mongoose.model('Answer',answerSchema)

module.exports = Answer;

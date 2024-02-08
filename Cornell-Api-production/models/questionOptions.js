const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionOptionSchema = new Schema({
    questionId: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    sortOrder:Number,
    value:String,
    optionImg: String,
    optionDesc:String,
    isDeleted:{type:Boolean,default:false},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let QuestionOption = mongoose.model('QuestionOptions',questionOptionSchema)

module.exports = QuestionOption;

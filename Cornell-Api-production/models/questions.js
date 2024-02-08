const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {type: String, required: true},
    questionType: {type: String,enum : ['radio','mcq','text','slider'],default:'text',required: true},
    maxAllowedAnswers:{type: Number,required: true,default: 1},
    maxCharacter: {type: Number,required: true},
    isDeleted:{type:Boolean,default:false},
    screen:{type:Number,required:true},
    minimumValue:{type:Number,default:0},
    maximumValue:{type:Number,default:0},
    midValue:{type:Number,default:0},
    questionOrder: {type:Number},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let Question = mongoose.model('Question',questionSchema)

module.exports = Question;

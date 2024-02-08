const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const homeworkSchema = new Schema({
    name: {type: String, required: true},
    totalTime: {type: Number,required: false},
    isDeleted:{type:Boolean,default:false},
    lessonId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Lesson'
    },
    homeworkDetail:[{
        contentUrl:{type:String},
        contentText:{type:String},
        duration:{type:Number},
        contentOrder:{type:Number},
        contentType:{type: String,enum : ['video','text'],default:'text',required: true}
    }],
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let Homework = mongoose.model('Homework',homeworkSchema)

module.exports = Homework;

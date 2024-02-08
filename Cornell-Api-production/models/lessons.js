const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    name: {type: String, required: true},
    totalTime: {type: Number,required: true},
    isDeleted:{type:Boolean,default:false},
    sortOrder:{type:Number,required:true},
    homeWorktotalTime:{type: Boolean, required:false},
    lessonDetails:[{
        isDeleted:{type:Boolean,default:false},
        contentUrl:{type:String},
        contentText:{type:String},
        duration:{type:Number},
        contentOrder:{type:Number},
        colorCode:{type:String},
        contentType:{type: String,enum : ['video','text'],default:'text',required: true}
    }],
    homeWorktotalTime:{type:Number},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let Lesson = mongoose.model('Lesson',lessonSchema)

module.exports = Lesson;

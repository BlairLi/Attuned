const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userImageSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    images:{
        type: String
    },
    isDeleted:{
        type:Boolean
    },
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let UserImages = mongoose.model('UserImages',userImageSchema)

module.exports = UserImages;

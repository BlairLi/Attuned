const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const siteAdminSchema = new Schema({
    name: String,
    password:{type: String, required: true},
    email: {type: String, required: true},
    role: {type: String,enum : ['admin','superadmin'],default:'superadmin',required: true},
    resetPasswordToken: String,
    accessToken: String,
    status:{type:Boolean, required:true,default:true},
    createdAt:{type:Date, default:new Date()},
    updatedAt:{type:Date, default:new Date()}
});

let SiteAdmin = mongoose.model('SiteAdmin',siteAdminSchema)

module.exports = SiteAdmin;

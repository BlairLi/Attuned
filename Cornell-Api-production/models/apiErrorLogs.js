const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const apiErrorLogsSchema = new Schema({
    apiName: {type: String, required: true},
    apiUrl: {type: String, required: true},
    response:{type: String, required: true},
    request: {type: String, required: true},
    userId: {type: mongoose.Types.ObjectId, required: true},
    createdAt:{type:Date,default: Date.now}
});

let ApiErrorLogs = mongoose.model('ApiErrorLogs',apiErrorLogsSchema)

module.exports = ApiErrorLogs;

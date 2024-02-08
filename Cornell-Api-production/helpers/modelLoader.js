module.exports = {

    loadModels : (req,res,next) => {
        const mongoose = require("mongoose")
        const models = {}
        models.user = require('../models/users');
        models.siteAdmin = require('../models/siteAdmin');
        models.userImages = require('../models/userImages');
        models.answers = require('../models/answers');
        models.device = require('../models/devices');
        models.questions = require('../models/questions');
        models.questionOptions = require('../models/questionOptions')
        models.apiErrorLogs = require('../models/apiErrorLogs')
        models.accessCode = require('../models/accessCode')
        models.lessons = require('../models/lessons')
        models.userLessons = require('../models/userLessons')
        models.userHomework = require('../models/userHomework')
        models.homework = require('../models/homework')
        models.notification = require('../models/notification')
        models.logs = require('../models/logs')
        models.recordings = require('../models/recordings'),
        models.userRecordings = require('../models/userRecordings'),
        models.testModel = require('../models/testModel'),
        models.reminder = require('../models/reminder'),
        models.genderFrequency = require('../models/genderFrequency')
        req.models = models;  
        req.database = mongoose.connection
        // console.log("je lo",req.database)
        next();
    }  
}
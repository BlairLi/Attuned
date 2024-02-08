var express = require('express');
var router = express.Router();
var db = require('../database');
let validate = require('../middlewares/validate');
let commonValidation = require('../validations/commonValidations');
let adminValidation = require('../validations/adminValidations');
let adminController = require('../controllers/AdminController');
let commonController = require('../controllers/CommonController');
let userController = require('../controllers/admin/userController');
let lessonController = require('../controllers/admin/lessonController');
let recordingController = require('../controllers/admin/recordingController');
const auth = require("../middlewares/authenticate");
const common = require('../common')
// let commonHelper = require('../helpers/common-helper');


router.get('/',(req, res)=>{return res.render('admin/index', {
    title: 'Login Page',
    error: false,
    message: ""
    // data: finalCountryData,
    // errorMessage:"",
    // domainUrl : "https://" ,
    // ampUrl: ampUrl,
    // searchQuery: searchQuery
});});
router.get('/admin',userController.login);
router.post('/admin/submitLogin',userController.login);
router.get('/admin/logout',userController.logout)
router.post('/admin/changePassword',userController.changePassword)
router.get('/admin/getUsersList/',auth.isAdminAuthenticated,userController.getUsersList)
router.get('/admin/getUsersLessionsFeedback/:userId',auth.isAdminAuthenticated,userController.getUsersLessionsFeedback)
router.get('/admin/getQuestions',auth.isAdminAuthenticated,userController.getQuestions)
router.get('/admin/getAllGenders',userController.getAllGenders)
router.get('/admin/reset-password/:token',userController.resetPasswordToken)
router.post('/admin/saveLessons',auth.isAdminAuthenticated,validate(adminValidation.saveLessons),lessonController.saveLessons)
router.post('/admin/uploadFile',lessonController.uploadFile)
router.get('/admin/getLessons',/*validate(adminValidation.lessonList),*/lessonController.lessonList)
router.get('/admin/getLessonDetails/:id',lessonController.getLessonDetails)
router.post('/admin/addHomework/:lessonId',auth.isAdminAuthenticated,validate(adminValidation.saveHomework),lessonController.saveHomework)
router.get('/admin/getQuestionnaireById/:id',auth.isAdminAuthenticated,userController.getQuestionnaireById)
router.get('/admin/getUserDetailsById/:userId',auth.isAdminAuthenticated,lessonController.getUserDetailsById)
router.get('/admin/disableUser/:userId',auth.isAdminAuthenticated,userController.disableUser)
router.get('/admin/disableQuestion/:questionId',auth.isAdminAuthenticated,userController.disableQuestions)
router.get('/admin/deleteUser/:userId',auth.isAdminAuthenticated,userController.deleteUser)
router.get('/admin/homeworkList/:lessonId',auth.isAdminAuthenticated,lessonController.homeworkList)
router.get('/admin/dashboard',auth.isAdminAuthenticated,userController.dashboard)
router.get('/admin/listsInfo',auth.isAdminAuthenticated,userController.listsInfo)

router.delete('/admin/disableQuestionOptions/:questionOptionId',auth.isAdminAuthenticated,userController.disableQuestionOptions)
router.delete('/admin/disableLessons/:lessonId',auth.isAdminAuthenticated,lessonController.disableLessons)
router.delete('/admin/deleteQuestions/:questionId',auth.isAdminAuthenticated,userController.deleteQuestions)
router.post('/admin/saveRecordings',auth.isAdminAuthenticated,recordingController.saveRecordings)
router.get('/admin/recordingList/',auth.isAdminAuthenticated,recordingController.recordingList)
router.delete('/admin/deleteRecording/:recordingId',auth.isAdminAuthenticated,recordingController.deleteRecording)
router.get('/admin/getUserRecording/:userId',auth.isAdminAuthenticated,recordingController.getUserRecording)

/*API's for admin web*/
router.post('/admin/createAdmin',auth.isAdminAuthenticated,validate(adminValidation.createAdmin),adminController.createAdmin);
router.post('/admin/forgotPassword',validate(commonValidation.forgotPassword),commonController.forgotPassword);
router.post('/admin/resetPassword/:token',validate(commonValidation.resetPassword),commonController.resetPassword);
router.post("/admin/saveQuestionnaire",auth.isAdminAuthenticated,validate(adminValidation.saveQuestionnaire), adminController.saveQuestionnaire);
router.post("/admin/saveAccessCode", auth.isAdminAuthenticated,validate(adminValidation.saveAccessCode), adminController.saveAccessCode);
router.delete("/admin/deleteQuestionnaire/:id",auth.isAdminAuthenticated, auth.isAuthenticated,validate(adminValidation.deleteQuestionnaire), adminController.deleteQuestionnaire);
router.delete("/admin/deleteAccessCode/:id", auth.isAdminAuthenticated,auth.isAuthenticated,validate(adminValidation.deleteAccessCode), adminController.deleteAccessCode);
router.delete("/admin/deleteUser/:id",auth.isAdminAuthenticated, adminController.deleteUser);
router.delete("/admin/deleteAnswer",auth.isAdminAuthenticated,adminController.deleteAnswer)
router.get("/admin/getAllUsersList",auth.isAdminAuthenticated, adminController.getAllUsersList)
router.post("/admin/addQuestions",auth.isAdminAuthenticated,adminController.addQuestions)
router.post("/admin/adminSendNotification",/*auth.isAdminAuthenticated,*/adminController.adminSendNotification)
router.get("/admin/notificationList",/*auth.isAdminAuthenticated,*/adminController.notificationList)
router.post("/admin/upload",(req, res) => commonController.upload(req, res, common.constants.image_type_allowed))
router.post('/admin/testAdminNotification',auth.isAdminAuthenticated,commonController.testAdminNotification);

router.post('/admin/saveGenderFrequency',/*auth.isAdminAuthenticated,*/userController.saveGenderFrequency)
router.get('/admin/getAllGenderIdealFrequencies',/*auth.isAdminAuthenticated,*/userController.getAllGenderIdealFrequencies)
router.get('/admin/notificationPage',(req,res)=>{
    res.render('admin/notification', {
        title: 'TransV',
        error: false,
        message: ""
    });
});
router.get('/admin/notificationPageList',(req,res)=>{
    res.render('admin/notificationList', {
        title: 'TransV',
        error: false,
        message: ""
    });
});
module.exports = router;

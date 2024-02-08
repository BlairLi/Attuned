var express = require('express');
var router = express.Router();
var db = require('../database');
let validate = require('../middlewares/validate');
let commonValidation = require('../validations/commonValidations');
let adminValidation = require('../validations/adminValidations');
let adminController = require('../controllers/AdminController');
let commonController = require('../controllers/CommonController');
const auth = require("../middlewares/authenticate");

router.post('/',validate(userValidation.login),userController.login);

router.post('/createAdmin',validate(adminValidation.createAdmin),adminController.createAdmin);
router.post('/forgotPassword',validate(commonValidation.forgotPassword),commonController.forgotPassword);
router.post('/resetPassword/:token',validate(commonValidation.resetPassword),commonController.resetPassword);
router.post("/saveQuestionnaire", auth.isAuthenticated,/*validate(adminValidation.saveQuestionnaire),*/ adminController.saveQuestionnaire);
router.post("/saveAccessCode", auth.isAuthenticated,validate(adminValidation.saveAccessCode), adminController.saveAccessCode);
router.delete("/deleteQuestionnaire/:id", auth.isAuthenticated,validate(adminValidation.deleteQuestionnaire), adminController.deleteQuestionnaire);
router.delete("/deleteAccessCode/:id", auth.isAuthenticated,validate(adminValidation.deleteAccessCode), adminController.deleteAccessCode);
router.get("/getAllUsersList", adminController.getAllUsersList)
router.post("/addQuestions",adminController.addQuestions)
router.get("/getQuestionAnswers/:userId",auth.isAuthenticated,userController.getQuestionAnswer)

module.exports = router;

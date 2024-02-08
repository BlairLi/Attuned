let express = require('express');
let userController = require('../controllers/UserController');
// let adminController = require('../controllers/AdminController');
let commonHelper = require('../helpers/common-helper');
// let authenticated = require('../middlewares/authenticate');
let validate = require('../middlewares/validate');
//let cache = require('../middlewares/cache');

let userValidation = require('../validations/userValidations');
let router = express.Router();
const auth = require("../middlewares/authenticate");
let commonValidation = require('../validations/commonValidations');
let commonController = require('../controllers/CommonController');


router.post('/signUp', validate(userValidation.signUp),userController.signUp);
router.post('/login',validate(userValidation.login),userController.login);
router.post('/saveAnswer',auth.isAuthenticated,userController.saveAnswers)
router.post('/verifyOTP/',auth.isAuthenticated,userController.verifyOTP)
router.post('/editProfile',auth.isAuthenticated,userController.editProfile);
// router.post('/upload',commonHelper.uploadPhoto)
router.get('/verifyEmailToken/:verifyEmailToken',validate(userValidation.verifyEmailToken),userController.verifyEmailToken)
router.post('/verifyAccessCode',validate(userValidation.verifyAccessCode),userController.verifyAccessCode)
router.post('/forgotPassword',validate(commonValidation.forgotPassword),commonController.forgotPassword);
router.post('/resetPassword/:token',validate(commonValidation.resetPassword),commonController.resetPassword);
router.get('/getQuestionAnswers',auth.isAuthenticated,userController.getQuestionAnswers)
router.get('/getLessonList',validate(userValidation.getLessonList),auth.isAuthenticated,/*cache,*/userController.getLessonList)
router.post('/submitLessonFeedback',validate(userValidation.submitLessonFeedback),auth.isAuthenticated,userController.submitLessonFeedback)
router.get('/getHomeworkContentList/:lessonId',validate(userValidation.getHomeworkContentList),auth.isAuthenticated,userController.getHomeworkContentList)
router.post('/submitExerciseFeedback',validate(userValidation.submitExerciseFeedback),auth.isAuthenticated,userController.submitExerciseFeedback)
// router.get('/verifyEmailToken/*',userController.verifyEmailToken)
// router.post('/test',authenticated.isAuthenticated)
router.get('/getLessonListFixed',auth.isAuthenticated,userController.getLessonListFixed)
router.get('/recordingTaskList',validate(userValidation.recordingTaskList),auth.isAuthenticated,userController.recordingTaskList)
router.get('/userRecordingList',/*validate(userValidation.recordingTaskList),*/auth.isAuthenticated,userController.userRecordingList)
router.post('/saveRecording',validate(userValidation.saveRecording),auth.isAuthenticated,userController.saveRecording)
router.post('/updateRecordingName',/*validate(userValidation.updateRecordingName),*/auth.isAuthenticated,userController.updateRecordingName)
router.delete("/deleteUserRecording/:recordingListId", /*validate(userValidation.deleteUserRecording),*/auth.isAuthenticated,userController.deleteUserRecording);
router.post('/changePassword',/*validate(userValidation.changePassword),*/auth.isAuthenticated,userController.changePassword)
router.get('/updateDeviceToken',auth.isAuthenticated,commonController.updateDeviceToken)
router.post('/settings',auth.isAuthenticated,userController.settings)
router.get('/getSettings',auth.isAuthenticated,userController.getSettings)
router.get('/truncateCollection/',commonController.truncateCollection);
router.get('/testTime',commonController.testTime);
router.post('/setReminder',auth.isAuthenticated,userController.setReminder)
router.get('/reminderList',auth.isAuthenticated,userController.reminderList)
router.post('/changeReminderStatus',auth.isAuthenticated,userController.changeReminderStatus)
router.post('/editReminder',auth.isAuthenticated,userController.editReminder)
router.delete("/deleteReminder/:reminderId",auth.isAuthenticated,userController.deleteReminder);
router.get('/notificationList',auth.isAuthenticated,userController.notificationList)

router.get('/logout',auth.isAuthenticated,userController.logout)
/*test email */
router.get("/testemail", async function(req, res){
 	try{
	 	let from_id = "developer@mobikasa.net",
		to_id = "kumarsm2405@gmail.com",
		subject = 'Verify Email',
		template_name = 'verifyEmail.html';
		replacements = { user: "skm", verifyEmailLink: "https://cornellapp.mobikasa.net/api/v1/verifyEmailToken/", date: "65433" };
		let out = await commonHelper.sendEmail(from_id,to_id,subject,template_name,replacements);
		
		res.send({status:"success", "resdata":out});
      }catch(err){
      	res.send({error:err})
      }                          

})

router.get("/skmtestios" , async (req, res)=>{
	try{
			let path =  require("path");
			var absolute_path = path.join(__dirname, "../");
			const  fs = require('fs');
	
			var AWS = require('aws-sdk');
			const s3 = new AWS.S3({
	  accessKeyId: process.env.AWS_ACCESS_KEY,
	  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
	});
			let contentType = [];
			contentType["ttf"] = "image/tiff";
			contentType["jpg"] = "image/jpeg";
			contentType["png"] = "image/png";
			contentType["gif"] = "image/gif";
			var absolute_path = path.join(__dirname, "../templates/common/");
	
	
			let filenames = fs.readdirSync(absolute_path);
			let s3Data = [];
			console.log(absolute_path);
			for(let filename of filenames){
			   let absolutePathToImage = absolute_path+filename;
			   let extension = absolutePathToImage.split('.').pop();
				let filebuffer = fs.readFileSync(absolutePathToImage);
				let params = {
				  Bucket: process.env.BUCKET_NAME,
				  Body: filebuffer,
				  Key: `common/${filename}`,
				  ACL: "public-read",
				  ContentType: contentType[extension],
				};
				//console.log(params);
				var response = s3.upload(params, (err, data) => {
				  if (err) {
					 return res.send({"Error":err});
				  } else {
						return res.send({"Success":data});
				  }
				});
				 
			}
			 //return res.send({"Success":filenames, "response":filenames});
		} catch (err) {
		console.log("err",err)
		  res.send({"response":err})
		} 
	});
	

/* close*/
module.exports = router;

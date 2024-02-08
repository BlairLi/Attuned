var updateNewLesson = async(req)=>{
    //let _ = require("lodash");
    //var common = require('../common');
    let mongoose = require('mongoose')
    //var helper = require('../helpers/common-helper')
    let user_id = req.decoded.user_id

    let userLessons = await req.models.userLessons.aggregate([
        { $match: { userId: mongoose.Types.ObjectId(user_id)}}
    ])

    let allLessons = await req.models.lessons.aggregate([
        { $sort : { sortOrder : 1 } }
    ])
    //console.log(allLessons)
    let userLessonsLength = userLessons.length
    console.log(userLessons[userLessonsLength-1].lessonId)
    if(userLessons[userLessonsLength-1].isCompleted == true){
        let lesson = {};
        let lessonToBeUpdated = {}
        allLessons.map(ele=>{
            console.log(ele._id,"==",userLessons[userLessonsLength-1].lessonId)
            if(ele._id.equals(userLessons[userLessonsLength-1].lessonId)){
                //console.log("here")
                lesson = ele
            }
        })
        //console.log(lesson)
        allLessons.map(ele=>{
            //console.log((lesson.sortOrder))
            if(ele.sortOrder == ((lesson.sortOrder)+1)){
                lessonToBeUpdated = ele
            }
        })
        //console.log(lessonToBeUpdated)
        let enableNextLesson = {
            userId : user_id,
            lessonId : lessonToBeUpdated._id,
            isCompleted : false,
            isEnabled : true
        }
        console.log("test",enableNextLesson)
        let saveEnabledNextLesson = new req.models.userLessons(enableNextLesson)
        await saveEnabledNextLesson.save()
        return true;
    }
}

var updateNewHomework =async(req)=>{
    //let _ = require("lodash");
    //var common = require('../common');
    let mongoose = require('mongoose')
    //var helper = require('../helpers/common-helper')
    let user_id = req.decoded.user_id
    let lessonId = req.params.lessonId

    userHomework = await req.models.userHomework.aggregate([
        {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId)}},
        // {$project:{
        //     _id:0,
        //     exerciseId:"$exerciseId",
        //     isCompleted:"$isCompleted"
        // }}
    ])

    homework = await req.models.homework.aggregate([
        {$match:{lessonId:mongoose.Types.ObjectId(lessonId)}}
    ])
    //console.log(allLessons)
    let userHomeworkLength = userHomework.length
    console.log(userHomework)
    if(userHomework[userHomeworkLength-1].isCompleted == true){
        let homeworkIndex =-1;
        let homeworkToBeUpdated = {}
        console.log(homework)
        homework.map((ele,index)=>{
            console.log(ele._id,"==",userHomework[userHomeworkLength-1].exerciseId)
            if(ele._id.equals(userHomework[userHomeworkLength-1].exerciseId)){
                //console.log("here")
                homeworkIndex = index
            }
        })
        //console.log(lesson)
        homework.map((ele,index)=>{
            //console.log((lesson.sortOrder))
            if(index == ((homeworkIndex)+1)){
                homeworkToBeUpdated = ele
            }
        })
        //console.log(lessonToBeUpdated)
        let enableNextHomework = {
            userId : user_id,
            exerciseId : homeworkToBeUpdated._id,
            lessonId:lessonId,
            isEnabled : true
        }
        //console.log(enableNextHomework)
        let saveEnabledNextHomework = new req.models.userHomework(enableNextHomework)
        await saveEnabledNextHomework.save()
        return true;
    }
}
module.exports = {

    signUp: async(req,res) =>{  
        try{
            var helper = require('../helpers/common-helper')
            const _ = require('lodash');
            const bcrypt = require('bcryptjs');
            const User = req.models.user
            const mongoose = require('mongoose');
            const moment = require("moment");
            const email = req.body.email
            const name = req.body.name
            req.body.isEmailVerified = false
            const telephoneNumber = req.body.telephoneNumber
            let hash = bcrypt.hashSync(req.body.password,10);
            req.body.password = hash;
            let user = new User(req.body)
            const common = require('../common')
            // let image = req.files.image
            
            //Check if users already exists or not
            let userData = await req.models.user.findOne({email:req.body.email})
            // console.log(userData)
            if(userData == null){
                //save user data in database
                // if(image){
                //     //save to temp storage and then save to aws
                // }
                
                
                let saveUsers = await user.save();
                let finalData = saveUsers.toObject()
                // console.log(saveUsers);
                //function to save profile image
                //function for otp verification

                //save user's device data in database
                await helper.checkDeviceExistance(saveUsers.id,req);
                await helper.saveDeviceData(saveUsers.id,req);
                
                //setting access token in header
                let access_token = await helper.createAccessToken(email, saveUsers.id, req);
                let userImage;
                if(req.files){
                    try{
                        let imageName = await helper.upload(req);
                        // let user_id = mongoose.Types.ObjectId(saveUsers.id);
                        let imageData = {
                            images : imageName,
                            userId: mongoose.Types.ObjectId(saveUsers.id)
                        }
                        let saveImage = new req.models.userImages(imageData)
                        userImage = imageData.images
                        await saveImage.save()

                    }catch(err){
                        console.log(err)
                    }
                    
                }
                //console.log("here")
                await User.findByIdAndUpdate(saveUsers.id,{accessToken : access_token},{upsert: true, new: true})
                res.set({
                    'access_token': access_token
                });
                let token = email + saveUsers._id;
                let verifyEmailToken = await helper.generateVerificationEmail(token)
                await User.findByIdAndUpdate(saveUsers._id,{ verifyEmailToken: verifyEmailToken}, {upsert: true, new: true})
                let name = saveUsers.name;
                // let template ='verifyEmail.html';
                let from_id = "developer@mobikasa.net",
                to_id = email,
                subject = 'Verify Email',
                template_name = 'verifyEmail.html';
                replacements = { user: name, verifyEmailLink: `${process.env.BASE_URL}api/v1/verifyEmailToken/`+verifyEmailToken, date: moment(new Date()).format("MMMM Do YYYY") };

                await helper.sendEmail(from_id,to_id,subject,template_name,replacements);
                // console.log(checkEmail)
                delete finalData.answers
                delete finalData.admin
                delete finalData.__v
                delete finalData.password
                finalData.userImage = process.env.BUCKET_ACCESS_URL+'common/'+userImage
               // console.log("**************************************************",JSON.stringify(finalData))
                let helperData = {
                    APIName : "SignUp",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify(finalData)
                }
                helper.saveLogs(req,helperData)
                //console.log("***********************************************")
                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    data: finalData, 
                    message: common.message.SIGNUP.SUCCESS
                });
                
                
            }else{
                if(!userData.isEmailVerified){
			let token = userData.email + userData._id;
			let verifyEmailToken = await helper.generateVerificationEmail(token)
			await User.findByIdAndUpdate(userData._id,{ verifyEmailToken: verifyEmailToken}, {upsert: true, new: true})
			let name = userData.name;
			// let template ='verifyEmail.html';
			let from_id = "developer@mobikasa.net",
			to_id = userData.email,
			subject = 'Verify Email',
			template_name = 'verifyEmail.html';
			replacements = { user: name, verifyEmailLink: `${process.env.BASE_URL}api/v1/verifyEmailToken/`+verifyEmailToken, date: moment(new Date()).format("MMMM Do YYYY") };

			await helper.sendEmail(from_id,to_id,subject,template_name,replacements);
                }
                //console.log("**************************************************")
                let helperData = {
                    APIName : "SignUp",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                    status: common.http_status.ERROR, 
                    code: common.http_status.HTTP_ALREADY_EXISTS, 
                    message: common.message.SIGNUP.ALREADY_EXISTS
                })
                }
                helper.saveLogs(req,helperData)
                //console.log("***********************************************")
                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.ERROR, 
                    code: common.http_status.HTTP_ALREADY_EXISTS, 
                    message: common.message.SIGNUP.ALREADY_EXISTS
                });
                
                
            }
        }catch(err){
            //console.log("**************************************************")
            let helperData = {
                APIName : "SignUp",
                request: JSON.stringify(req.body),
                response : JSON.stringify(err)
            }
            helper.saveLogs(req,helperData)
            console.log("***********************************************")
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
        
    },

    verifyEmailToken: async(req,res) =>{
        //check from database if token exists if exists -> isEmailVerified set to 1
        let mongoose = require('mongoose');
        let common = require('../common')
        // console.log(req)
        let verifyEmailToken = req.params.verifyEmailToken;
        // console.log(verifyEmailToken)
        // let user_id = req.decoded.user_id
        // let tokenExists = await req.models.user.findOne({verifyEmailToken:verifyEmailToken})
        // console.log(tokenExists)
        // if(tokenExists){
            console.log(verifyEmailToken)
            let updateEmailToken = await req.models.user.updateOne({verifyEmailToken:verifyEmailToken},{isEmailVerified : true,verifyEmailToken:" "})
            console.log(updateEmailToken)

            return res.render('admin/verifyEmail', {
                error: false,
                message: common.message.VERIFY_EMAIL_TOKEN.SUCCESS
            });
            // res.status(common.http_status.HTTP_SUCCESS).json({ 
            //     status: common.http_status.SUCCESS, 
            //     code: common.http_status.HTTP_SUCCESS,
            //     message: common.message.VERIFY_EMAIL_TOKEN.SUCCESS
            // });
        // }else{
        //     res.status(common.http_status.HTTP_NOT_FOUND).json({ 
        //         status: common.http_status.ERROR, 
        //         code: common.http_status.HTTP_NOT_FOUND,
        //         message: common.message.VERIFY_EMAIL_TOKEN.ERROR
        //     });
        // }
    },
    
    login: async(req,res) => {
        try{
            var helper = require('../helpers/common-helper')
            const bcrypt = require('bcryptjs');
            const common = require('../common')
            const moment = require("moment")
            const User = req.models.user
            let email = req.body.email
            let userPassword = await req.models.user.findOne({email:email});
            let isCompleted = 0;

            //console.log(req.body.password,userPassword.password)
            if(userPassword){
                let comparePassword = await bcrypt.compare(req.body.password,userPassword.password);
                if(comparePassword){
                    let answers = await req.models.answers.find({userId:userPassword._id});
                            for(var i = 0;i<answers.length;i++){
                                if(answers[i].isCompleted){
                                    isCompleted = 1
                                }
                            }
                    if(userPassword.admin == true){
                        let userData = Object.assign(userPassword);
                        let access_token = await helper.createAccessToken(email, userPassword._id, req);
                            let updateAccessToken = await User.findByIdAndUpdate(userPassword._id,{accessToken : access_token},{upsert: true, new: true})
                            res.set({
                                'access_token': access_token
                            });
                        let data = {
                            id: userData._id,
                            email: userData.email,
                            telephone: userData.telephone,
                            name: userData.name,
                            isCompleted: isCompleted
                        }
                        //console.log("**************************************************")
                        let helperData = {
                            APIName : "Login",
                            request: JSON.stringify(req.body),
                            response : JSON.stringify({
                                code:common.http_status.HTTP_SUCCESS,
                                status: common.http_status.SUCCESS,
                                message: common.message.LOGIN.SUCCESS,
                                data:data
                            })
                        }
                        helper.saveLogs(req,helperData)
                        //console.log("***********************************************")
                        res.status(common.http_status.HTTP_SUCCESS).send({
                            code:common.http_status.HTTP_SUCCESS,
                            status: common.http_status.SUCCESS,
                            message: common.message.LOGIN.SUCCESS,
                            data
                        })
                    }else{
                        if(userPassword.isDeleted == true){
                            
                            res.status(common.http_status.HTTP_UNAUTHORIZED).send({
                                status: common.http_status.ERROR,
                                code: common.http_status.HTTP_UNAUTHORIZED,
                                message: "Account disabled.Kindly contact the admin"
                            })
                            let helperData = {
                                APIName : "Login",
                                request: JSON.stringify(req.body),
                                response : JSON.stringify({
                                    status: common.http_status.ERROR,
                                    code: common.http_status.HTTP_UNAUTHORIZED,
                                    message: "Account disabled.Kindly contact the admin"
                                })
                            }
                            helper.saveLogs(req,helperData)
                        }else{
                            if(userPassword.isEmailVerified){
                                await helper.checkDeviceExistance(userPassword._id,req);
                                let saveDevice = await helper.saveDeviceData(userPassword._id,req);
                                let userData = Object.assign(userPassword);
    
                                let access_token = await helper.createAccessToken(email, userPassword._id, req);
                                let updateAccessToken = await User.findByIdAndUpdate(userPassword._id,{accessToken : access_token},{upsert: true, new: true})
                                res.set({
                                    'access_token': access_token
                                });
                                // send from questions table in array of json according to step also add isFinished flag -> append in data object
                                let userImage = await req.models.userImages.find({userId:userPassword._id});
                                //console.log(userImage)
                                if(userImage.length){
                                    userImage = process.env.BUCKET_ACCESS_URL +'common/'+userImage[0].images
                                }else{
                                    userImage = ""
                                }
                                let data = {
                                    id: userData._id,
                                    email: userData.email,
                                    telephone: userData.telephone,
                                    name: userData.name,
                                    answers: userData.answers,
                                    isCompleted: isCompleted,
                                    userImage:userImage
                                }
                                //console.log("**************************************************")
                                let helperData = {
                                    APIName : "Login",
                                    request: JSON.stringify(req.body),
                                    response : JSON.stringify({
                                        code:common.http_status.HTTP_SUCCESS,
                                        status: common.http_status.SUCCESS,
                                        message: common.message.LOGIN.SUCCESS,
                                        data:data
                                    })
                                }
                                helper.saveLogs(req,helperData)
                                //console.log("***********************************************")
                                res.status(common.http_status.HTTP_SUCCESS).send({
                                    code: common.http_status.HTTP_SUCCESS,
                                    status: common.http_status.SUCCESS,
                                    message: common.message.LOGIN.SUCCESS,
                                    data
                                })
                            }else{
                                // send email again
                                let token = email + userPassword._id;
                                let verifyEmailToken = await helper.generateVerificationEmail(token)
                                await User.findByIdAndUpdate(userPassword._id,{ verifyEmailToken: verifyEmailToken}, {upsert: true, new: true})
                                let access_token = await helper.createAccessToken(email, userPassword._id, req);
                                res.set({
                                    'access_token': access_token
                                });
                                let name = userPassword.name;
                                // let template ='verifyEmail.html';
                                let from_id = "developer@mobikasa.net",
                                to_id = email,
                                subject = 'Verify Email',
                                template_name = 'verifyEmail.html';
                                replacements = { user: name, verifyEmailLink: `${process.env.BASE_URL}` +"api/v1/verifyEmailToken/"+verifyEmailToken, date: moment(new Date()).format("MMMM Do YYYY") };
                                await helper.sendEmail(from_id,to_id,subject,template_name,replacements);
                                
                                //console.log("**************************************************")
                                let helperData = {
                                    APIName : "Login",
                                    request: JSON.stringify(req.body),
                                    response : JSON.stringify({ 
                                        status: common.http_status.ERROR, 
                                        code: common.http_status.HTTP_UNAUTHORIZED,
                                        message: common.message.LOGIN.VERIFY_EMAIL
                                    })
                                }
                                helper.saveLogs(req,helperData)
                                //console.log("***********************************************")
                                
                                
                                res.status(common.http_status.HTTP_UNAUTHORIZED).json({ 
                                    status: common.http_status.ERROR, 
                                    code: common.http_status.HTTP_UNAUTHORIZED,
                                    message: common.message.LOGIN.VERIFY_EMAIL
                                });
                            }
                        }
                    }
                }else{

                    //console.log("**************************************************")
                    let helperData = {
                        APIName : "Login",
                        request: JSON.stringify(req.body),
                        response : JSON.stringify({
                            code :common.http_status.HTTP_UNAUTHORIZED,
                            status: common.http_status.ERROR,
                            message: common.message.LOGIN.FAILED
                        })
                    }
                    helper.saveLogs(req,helperData)
                    //console.log("***********************************************")

                    res.status(common.http_status.HTTP_UNAUTHORIZED).send({
                        code :common.http_status.HTTP_UNAUTHORIZED,
                        status: common.http_status.ERROR,
                        message: common.message.LOGIN.FAILED
                    })
                }
            }else{
                //console.log("**************************************************")
                let helperData = {
                    APIName : "Login",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({
                        status: common.http_status.ERROR,
                        code: common.http_status.HTTP_UNAUTHORIZED,
                        message: common.message.LOGIN.FAILED
                    })
                }
                helper.saveLogs(req,helperData)
                //console.log("***********************************************")
                res.status(common.http_status.HTTP_UNAUTHORIZED).send({
                    status: common.http_status.ERROR,
                    code: common.http_status.HTTP_UNAUTHORIZED,
                    message: common.message.LOGIN.DOES_NOT_EXIST
                })
            }
        }catch(err){
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
    },

    editProfile: async(req,res) =>{  
        try{
            var helper = require('../helpers/common-helper')
            const _ = require('lodash');
            const mongoose = require('mongoose');
            const name = req.body.name
            const user_id = req.decoded.user_id
            const common = require('../common')
            var data = {}
            
           
            if(name != null || name != undefined){
                await req.models.user.findByIdAndUpdate(mongoose.Types.ObjectId(user_id),{ name: name})
                //data.name = name
            }
            if(req.files){
                try{
                    let imageName = await helper.upload(req);
                    // let user_id = mongoose.Types.ObjectId(saveUsers.id);
                    let imageData = {
                        userId: mongoose.Types.ObjectId(user_id),
                        images : imageName,
                        isDeleted:false
                    }
                    userImage = imageData.images
                    let deletePreviuos = await req.models.userImages.deleteMany(
                        {userId : mongoose.Types.ObjectId(user_id)}
                    ) 
                    let saveImage = new req.models.userImages(imageData)
                    userImage = imageData.images
                    await saveImage.save()
                    //  let Image = process.env.BUCKET_ACCESS_URL+'common/'+userImage
                    // data.userImage = Image

                }catch(err){
                    console.log(err)
                }
                
            }

            var result = await req.models.user.aggregate([
                {$match:{_id: mongoose.Types.ObjectId(user_id)}},
                {
                    $lookup:
                      {
                        from: "userimages",
                        localField: "_id",
                        foreignField: "userId",
                        as: "userData"
                      }
                }
            ])
            data = {
                id: result[0]._id,
                email: result[0].email,
                telephone: result[0].telephone,
                name: result[0].name,
                userImage:process.env.BUCKET_ACCESS_URL+'common/'+result[0].userData[0].images
            }

            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                data: data, 
                message: "Your profile has been successfully updated "
            });
            let helperData = {
                APIName : "editProfile",
                request: JSON.stringify(req.body),
                response : JSON.stringify(data)
            }
            helper.saveLogs(req,helperData)
        }catch(err){
            console.log(err)
            let helperData = {
                APIName : "SignUp",
                request: JSON.stringify(req.body),
                response : JSON.stringify(err)
            }
            helper.saveLogs(req,helperData)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
        
    },

    saveAnswers: async(req,res) => {
        let user_id = req.decoded.user_id
        let common = require('../common');
        let helper = require('../helpers/common-helper')
        try{
            let mongoose = require('mongoose');
           // let userDetails = await req.models.user.findOne({_id: mongoose.Types.ObjectId(user_id)});
            
            let answers = req.body.answer;
            let isCompleted = req.body.isCompleted;
            if(answers.length > 0){
                if(typeof(answers) == "string"){
                    answers = JSON.parse(req.body.answer)
                }
                
                answers.map(data =>{
                    if(data.questionOptionId)
                        questionOptionId = mongoose.Types.ObjectId(data.questionOptionId)
                    else
                        questionOptionId = null
                        data.questionId = mongoose.Types.ObjectId(data.questionId)
                        data.questionOptionId = questionOptionId
                        data.userId = mongoose.Types.ObjectId(req.decoded.user_id)
                })
                //console.log(answers,"final occurence")
                let count = 0;
                let findAnswer;
                let question;
                let answer;
                let answerArray = []
                for(var i =0;i< answers.length;i++){
                    answer = await req.models.answers.find({questionId:answers[i].questionId,userId:req.decoded.user_id})
                    if(answer){
                        deleteQuestion = await req.models.answers.deleteMany({questionId:answers[i].questionId,userId:req.decoded.user_id})
                    }
                }
    
                for(var i =0;i< answers.length;i++){
                    var updatedAnswer = new req.models.answers({
                        userId:answers[i].userId,
                        questionId:answers[i].questionId,
                        questionOptionId:answers[i].questionOptionId,
                        otherAnswer: answers[i].otherAnswer
                    });
                    findAnswer = await updatedAnswer.save()
                    answerArray.push(findAnswer)
                }
                let isCompletedUpdate;
                if(isCompleted){
                    isUserAvailable = await req.models.answers.findOne({userId:req.decoded.user_id});
                    if(isUserAvailable){
    
                        isCompletedUpdate = await req.models.answers.updateMany({userId:req.decoded.user_id},{isCompleted:1});
                        console.log("update",isCompletedUpdate)
                    }
                    // console.log(isCompletedUpdate)
                    
                }
                for(var i =0; i<answers.length;i++){
                    answers = await req.models.answers.find({questionId:answers[i].questionId,userId:req.decoded.user_id,questionOptionId:answers[i].questionOptionId})
                }
                // console.log(findAnswer)
                delete findAnswer.isCompleted;
                // console.log(isCompletedUpdate)
                if(isCompletedUpdate){
                    findAnswer.isCompleted = isCompletedUpdate.isCompleted
                }
                
                let helperData = {
                    APIName : "Save Answers",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({
                        code: common.http_status.HTTP_SUCCESS,
                        status: common.http_status.SUCCESS,
                        message: common.message.SAVE_ANSWER.UPDATE.SUCCESS,
                        data: findAnswer
                    })
                }
                helper.saveLogs(req,helperData)
                res.status(common.http_status.HTTP_SUCCESS).json({
                    code: common.http_status.HTTP_SUCCESS,
                    status: common.http_status.SUCCESS,
                    message: common.message.SAVE_ANSWER.UPDATE.SUCCESS,
                    data: findAnswer
                })
            }else{
                if(isCompleted){
                    let isUserAvailable = await req.models.answers.findOne({userId:req.decoded.user_id});
                    if(isUserAvailable){
                        await req.models.answers.updateMany({userId:req.decoded.user_id},{isCompleted:1});
                    } 
                }
                let helperData = {
                    APIName : "Save Answers",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({
                        code: common.http_status.HTTP_SUCCESS,
                        status: common.http_status.SUCCESS,
                        message: common.message.SAVE_ANSWER.UPDATE.SUCCESS,
                        data: {}
                    })
                }
                helper.saveLogs(req,helperData)
                res.status(common.http_status.HTTP_SUCCESS).json({
                    code: common.http_status.HTTP_SUCCESS,
                    status: common.http_status.SUCCESS,
                    message: common.message.SAVE_ANSWER.UPDATE.SUCCESS,
                    data: {}
                })
            }          
            

        }catch(err){
                let helperData = {
                    APIName : "Save Answers",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({
                        code:common.http_status.INTERNAL_SERVER_ERROR,
                        status:common.http_status.ERROR,
                        message: common.message.INTERNAL_SERVER_ERROR
                    })
                }
                helper.saveLogs(req,helperData)
            await req.models.apiErrorLogs.create({apiName:'saveAnswers',apiUrl:'api/v1/saveAnswer',err,req,user_id})
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR
            })
        }

    },

    verifyAccessCode: async(req,res) =>{
        try{
            let accessCode = req.body.accessCode;
            let common = require('../common');
            let helper = require('../helpers/common-helper');
            // console.log(await req.models.accessCode.find({accessCode:accessCode,isEnabled:true}))
            let accessCodeAvailable = await req.models.accessCode.find({accessCode:accessCode,isEnabled:true});
            // console.log(accessCodeAvailable)
            console.log("**************************************************")
            let helperData = {
                APIName : "Get Question Answer",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: common.message.VERIFY_ACCESS_CODE.SUCCESS
                })
            }
            helper.saveLogs(req,helperData)
            console.log("***********************************************")
            if(accessCodeAvailable.length){
                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: common.message.VERIFY_ACCESS_CODE.SUCCESS
                });
            }else{
                res.status(common.http_status.HTTP_NOT_FOUND).json({ 
                    status: common.http_status.ERROR, 
                    code: common.http_status.HTTP_NOT_FOUND,
                    message: common.message.VERIFY_ACCESS_CODE.ERROR
                });
            }
        }catch(err){
            res.status(common.http_status.HTTP_NOT_FOUND).json({ 
                status: common.http_status.ERROR, 
                code: common.http_status.HTTP_NOT_FOUND,
                message: common.message.INTERNAL_SERVER_ERROR
            });
        }

    },

    getQuestionAnswers: async(req,res) =>{
        let common = require('../common');
        let userId = req.decoded.user_id;
        let helper = require('../helpers/common-helper')
        let mongoose = require('mongoose');
        let _ = require("lodash");
        let questionCompleteData = await req.models.questions.aggregate([
            {$lookup:{ from:'questionoptions',localField:'_id',foreignField:'questionId',as:'options'}},
            {$unwind:'$options'},
            {$lookup:{
                from:'answers',
                localField:'_id',
                foreignField:'questionId',
                as:'answer'
            }},
            {$sort:{'question.questionOrder':-1}},
            {$group:
                {
                    "_id":"$_id",
                    question:{
                        "$push":{"question":"$question","questionOrder":"$questionOrder","questionType":"$questionType","maxAllowedAnswers":"$maxAllowedAnswers","maxCharacter":"$maxCharacter","isDeleted":"$isDeleted","screen":"$screen","minimumValue":"$minimumValue","maximumValue":"$maximumValue","midValue":"$midValue"}
                    },questionOptions:{
                        '$push':'$options'
                    },answers:{
                        '$push':'$answer'
                    }
                }
            }
            
        ]);
        
        questionCompleteData.map(data=>{
            
            data.question = {...data.question[0]}
            data.question.questionOptions = data.questionOptions
            
        });
        delete questionCompleteData.questionOptions

        completeData = questionCompleteData;
        let findAnswerExists;
        for(var k = 0; k<completeData.length; k++){
            if(completeData[k].question.isDeleted == true || completeData[k].question.isDeleted == "true"){
                findAnswerExists = await req.models.answers.findOne({questionId:mongoose.Types.ObjectId(completeData[k]._id),userId:req.decoded.user_id})
                if(findAnswerExists == null){
                    completeData.splice(k,1)
                }
            }
        }
        for(var i = 0;i <completeData.length;i++){
            // console.log(completeData[i].questionOptions.length)
            for(var j = 0;j<completeData[i].questionOptions.length;j++){
                // console.log(typeof(completeData[i].questionOptions[j].isDeleted),typeof(true))
                if(completeData[i].questionOptions[j].isDeleted == true || completeData[i].questionOptions[j].isDeleted == "true"){
                    findAnswerExists =await req.models.answers.findOne({questionOptionId:mongoose.Types.ObjectId(completeData[i].questionOptions[j]._id),userId:req.decoded.user_id})
                    if(findAnswerExists == null){
                        completeData[i].questionOptions.splice(j,1)
                        // delete completeData[i].questionOptions[j]
                    }
                }
            }
        }
        // console.log(completeData)
        // return;
        let screenNumber  =[];
        completeData.forEach(data=>{
            screenNumber.push(data.question.screen)
        });
        screenNumber = [... new Set(screenNumber)]
        isCompleted = 0;
        let finalData =[];
        completeData.map(data =>{
            
            data.questionId = data._id
            
            if(data.question.questionType != "slider"){
                delete data.question.minimumValue,
                delete data.question.maximumValue
                delete data.question.midValue
            }
            
            delete data.questionOptions
            delete data._id
            data.questionOrder = data.question.questionOrder 
            data.screen = "Screen"+data.question.screen
            data.question.questionOptions.map(datas=>{
                datas.questionOptionId = datas._id
                if(datas.value == ""){
                    delete datas.questionId
                    delete datas.questionOptionId
                    delete datas.sortOrder
                    delete datas.optionDesc
                    delete datas.value
                    delete datas.optionImg
                    delete datas.createdAt
                    delete datas.updatedAt
                    delete datas.isDeleted
                }
                delete datas._id
                delete datas.__v

            })

            let answerData = [];
            let isOptionAdded = false;
            data.answers.map(answer=>{
                answer.map(answerOptionData => {  
                    
                    if(answerOptionData.userId == req.decoded.user_id){
                        // console.log("ye",answerOptionData.userId)
                        if(answerOptionData.isCompleted){
                            data.isCompleted = answerOptionData.isCompleted 
                        }
                        delete answerOptionData.isCompleted
                        delete answerOptionData._id
                        delete answerOptionData.__v
                        if(answerOptionData.otherAnswer == null){
                            delete answerOptionData.otherAnswer
                        }
                        answerData.push(answerOptionData);
                        isOptionAdded = true
                    }
              
                });                
            });
            // console.log("is",data.isCompleted)
            var arrayOfObjAfter = _.map(
                _.uniq(
                    _.map(answerData, function(obj){
                        return JSON.stringify(obj);
                    })
                ), function(obj) {
                    return JSON.parse(obj);
                }
            );
            arrayOfObjAfter = _.uniqBy(arrayOfObjAfter,'questionOptionId')
            data.answers = arrayOfObjAfter
            if(data.isCompleted){
                isCompleted = data.isCompleted
            }
            delete data.question.screen
            
        });
        let ifIsCompleted = await req.models.answers.findOne({userId:mongoose.Types.ObjectId(req.decoded.user_id),isCompleted:1});
        // console.log(ifIsCompleted)
        // console.log(isCompleted)
        if(ifIsCompleted){
            isCompleted = ifIsCompleted.isCompleted
        }else{
            isCompleted = 0
        }
        finalData = _.sortBy(completeData,"questionOrder")
        finalData = _.groupBy(finalData,"screen");
        finalData.isCompleted = isCompleted
        
        let helperData = {
            APIName : "Get Question Answer",
            request: JSON.stringify(req.body),
            response : JSON.stringify({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: common.message.GET_QUESTION_ANSWER.SUCCESS,
                data : finalData
            })
        }
        helper.saveLogs(req,helperData)
        res.status(common.http_status.HTTP_SUCCESS).send({ 
            status: common.http_status.SUCCESS, 
            code: common.http_status.HTTP_SUCCESS,
            message: common.message.GET_QUESTION_ANSWER.SUCCESS,
            data : finalData
        });
    },
     
    usersList: async(req,res) =>{
        let usersList = await req.models.answers.find({userId:"5e730fd3b653c12717bfe3d2"});
        // console.log(await req.models.user)
        let response = {
            data: usersList
        }
        res.status(200).json(response)
    },
 
    verifyOTP: async(req,res)=>{
        try{
            let common = require('../common')
            let mongoose = require('mongoose');

            const User = req.models.user
            
            var OTP = req.body.OTP
            let user_id = req.decoded.user_id

            let current_time = (new Date()).getTime();//epoch in miliseconds
            let current_time_seconds = Math.round(current_time/1000);//epoch in seconds


            
            var userData = await User.findById(req.decoded.user_id)
            timeDiff = current_time_seconds - userData.otpExpiresIn ;

            if(timeDiff >= 300){
                res.status(common.http_status.HTTP_BAD_REQUEST).send({
                    status: common.http_status.ERROR,
                    message: common.message.VERIFY_OTP.FAILED
                })
            }else{
                if(userData.OTP == OTP ){
                    let update = {
                        otpExpiresIn : '',
                        OTP : '0',
                        otpVerified : true
                    }
                    
                    let otpData = await User.findByIdAndUpdate({_id:mongoose.Types.ObjectId(user_id)}, update)
                    var resData = ['_id','email','name','telephone','answers']
                    finalData = await User.find({_id:mongoose.Types.ObjectId(user_id)},resData)
                    res.status(common.http_status.HTTP_SUCCESS).send({
                        status: common.http_status.SUCCESS,
                        message: common.message.VERIFY_OTP.SUCCESS,
                        data: finalData
                    })
                    //  console.log(finalData)
                }else{
                    res.status(common.http_status.HTTP_BAD_REQUEST).send({
                        status: common.http_status.ERROR,
                        message: common.message.VERIFY_OTP.WRONG_OTP
                    })
                }
            }
        }catch(err){
            res.status(common.http_status.INTERNAL_SERVER_ERROR).send({
                status: common.http_status.INTERNAL_SERVER_ERROR,
                message: common.message.INTERNAL_SERVER_ERROR
            })
        }
    },

    getLessonList : async(req, res) =>{
        try{
            //const redis = require('../redisDb');
            let _ = require("lodash");
            var common = require('../common');
            let mongoose = require('mongoose')
            var helper = require('../helpers/common-helper')
            let user_id = req.decoded.user_id
            var lessons = []
            var data = {}
            // let lessonList = await req.models.lessons.find({isDeleted:false})
            //console.log(user_id)

            
            //return;
            var userLessonData = await req.models.userLessons.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(user_id),isEnabled:true}},
                {$project:{
                        _id:0,
                        lessonId:"$lessonId",
                        // isCompleted:"$isCompleted",
                        // isEnabled:"$isEnabled"
                    }
                }
            ])
            if(userLessonData.length > 0){
                //check for new added lesson  and update
                await updateNewLesson(req)
            }
            var newLesson = await req.models.lessons.aggregate([
               { $sort : { sortOrder : 1 } },
                {$project:{
                    _id:0,
                    lessonId:"$_id",
                    name:"$name",
                    totalTime:"$totalTime",
                    isDeleted : "$isDeleted",
                    lessonContents:"$lessonDetails",
                    homeWorktotalTime:"$homeWorktotalTime"
                }}
            ])
            var userCurrentLessonData = await req.models.userLessons.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(user_id),isEnabled:true,isFeedBack:true}},
                {$project:{
                        _id:0,
                        lessonId:"$lessonId",
                        isFeedBack:"$isFeedBack",
                        isCompleted:"$isCompleted",
                        // isEnabled:"$isEnabled"
                    }
                }
            ])

            newLesson.map(data=>{
                if(data.isDeleted == true){
                    for(i=0;i<userLessonData.length;i++){
                        if(_.isEqual(data.lessonId,userLessonData[i].lessonId)){
                            lessons.push(data)
                        }
                    }
                }else{
                    lessons.push(data)
                }
            })
            
        //    console.log(userLessonData)
        //    console.log(userCurrentLessonData)
            
            if(userLessonData.length>0){
                lessons.map(data=>{
                    //data.homeWorktotalTime = 1200
                    data.homeWorkName ="Homework"
                    data.isEnabled = false,
                    data.isCompleted = false,
                    data.isFeedBack = false
                    for(i=0;i<userLessonData.length;i++){
                        if(_.isEqual(data.lessonId,userLessonData[i].lessonId)){
                            
                            // if(userCurrentLessonData.length>0 && userCurrentLessonData[i].isFeedBack == true){
                            //     data.isEnabled = true,
                            //     data.isCompleted = userCurrentLessonData[i].isCompleted,
                            //     data.isFeedBack = userCurrentLessonData[i].isFeedBack
                            // }else{
                                data.isEnabled = true,
                                data.isCompleted = false,
                                data.isFeedBack = false
                           // }
                        }
                    }
                    if(userCurrentLessonData.length>0){
                        for(i=0;i<userCurrentLessonData.length;i++){
                            if(_.isEqual(data.lessonId,userCurrentLessonData[i].lessonId)){
                                data.isEnabled = true,
                                data.isCompleted = userCurrentLessonData[i].isCompleted,
                                data.isFeedBack = userCurrentLessonData[i].isFeedBack
                            }
                        }
                    }
                    
                })
            }else{

                lessons.map((data,index)=>{
                    //data.homeWorktotalTime = 1200
                    data.homeWorkName ="Homework"
                    data.isEnabled = false,
                    data.isCompleted = false
                    data.isFeedBack = false
                    if(index == 0){
                        data.isEnabled = true,
                        data.isCompleted = false,
                        data.isFeedBack = false
                    }
                })
            }
            data = {lessons}
           // redis.setex(user_id.toString(), 3600, JSON.stringify(data));
            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "List",
                data : data
            });
            let helperData = {
                APIName : "getLessonList",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS, 
                    message: "List",
                    data : data
                })
            }
            helper.saveLogs(req,helperData)
        }catch(e){
            console.log(e)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error:e
            })
            let helperData = {
                APIName : "getLessonList",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.ERROR, 
                    code: common.http_status.INTERNAL_SERVER_ERROR, 
                    message:e
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    submitLessonFeedback : async(req, res)=>{
        var _ = require("lodash");
        var common = require('../common');
        var mongoose = require('mongoose')
        var helper = require('../helpers/common-helper')
        let user_id = req.decoded.user_id
        let lessonId = req.body.lessonId
        let feedBack = req.body.feedBack
        var data = {}
        try{
            let checkUserLessonData = await req.models.userLessons.aggregate([
                {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId),isFeedBack:true}}
            ])
            //console.log(checkUserLessonData)
            if(checkUserLessonData.length>0){
                let updatedData = {
                    feedBack : feedBack
                }
                var checkFeed=  await req.models.userLessons.updateOne({userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId)},updatedData)
            }else{
                await req.models.userLessons.deleteOne({userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId)})
                let userLessonData = {
                    userId : user_id,
                    lessonId : lessonId,
                    isCompleted : false,
                    isEnabled : true,
                    isFeedBack:true,
                    feedBack : feedBack
                }
                let saveFeedback = new req.models.userLessons(userLessonData)
                await saveFeedback.save()
            }

            let tempCheck = await req.models.userLessons.aggregate([
                {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId),isFeedBack:true}},
                {$project:{
                    feedBack:1
                }}
            ])
            if(tempCheck.length==1){

                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Your feedback has been submitted",
                    data : data
                });
                let helperData = {
                    APIName : "submitLessonFeedback",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        status: common.http_status.SUCCESS, 
                        code: common.http_status.HTTP_SUCCESS,
                        message: "Your feedback has been submitted",
                        data : data
                    })
                }
                helper.saveLogs(req,helperData)
            }else{
                res.status(common.http_status.HTTP_BAD_REQUEST).json({
                    code:common.http_status.HTTP_BAD_REQUEST,
                    status:common.http_status.ERROR,
                    message: "Feedback not submitted.Please try again"
                })
                let helperData = {
                    APIName : "submitLessonFeedback",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        code:common.http_status.HTTP_BAD_REQUEST,
                        status:common.http_status.ERROR,
                        message: "Feedback not submitted.Please try again"
                    })
                }
                helper.saveLogs(req,helperData)
            }
        }catch(e){
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR
            })
            let helperData = {
                APIName : "submitLessonFeedback",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR
                })
            }
            helper.saveLogs(req,helperData)
        }

    },

    getHomeworkContentList : async(req,res)=>{
        var _ = require("lodash");
        var common = require('../common');
        var mongoose = require('mongoose')
        var helper = require('../helpers/common-helper')
        let user_id = req.decoded.user_id
        let lessonId = req.params.lessonId
        var homework = []
        var userHomework = []
        var data = {}
        console.log(user_id)
        console.log(lessonId)
        try{
            let userHomeworkTest = await req.models.userHomework.aggregate([
                {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId)}},
                // {$project:{
                //     _id:0,
                //     exerciseId:"$exerciseId",
                //     isCompleted:"$isCompleted"
                // }}
            ])
            if(userHomeworkTest.length>0){
                //update new exercises to the list
                await updateNewHomework(req)
            }
            
            
            var userLessonData = await req.models.userLessons.aggregate([
                {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId),isFeedBack:true,isEnabled:true}}
            ])
           if(userLessonData.length>0){
                homework = await req.models.homework.aggregate([
                    {$match:{lessonId:mongoose.Types.ObjectId(lessonId)}},
                    {
                        $project:{
                            _id:0,
                             exerciseId:"$_id",
                             lessonId:"$lessonId",
                             name:"$name",
                             totalTime:"$totalTime",
                             exerciseContents:"$homeworkDetail"
                        }
                    }
                ])
                
                userHomework = await req.models.userHomework.aggregate([
                    {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId),isEnabled:true}},
                    // {$project:{
                    //     _id:0,
                    //     exerciseId:"$exerciseId",
                    //     isCompleted:"$isCompleted"
                    // }}
                ])
                if(userHomework.length>0){
                    homework.map(data=>{
                        data.isEnabled = false,
                        data.isCompleted = false
                        for(i=0;i<userHomework.length;i++){
                            if(_.isEqual(data.exerciseId,userHomework[i].exerciseId)){
                                data.isEnabled = true
                                if(userHomework[i].isCompleted){
                                    data.isCompleted = userHomework[i].isCompleted
                                }
                                
                            }
                        }
                    })
                }else{
                    homework.map((data,index)=>{
                        data.isEnabled = false,
                        data.isCompleted = false
                        if(index == 0){
                            data.isEnabled = true,
                            data.isCompleted = false
                        }
                    })
                }
                
                data={homework}
                data.totalTime = 20
                data.name ="Homework"
                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "List",
                    data : data
                });
                let helperData = {
                    APIName : "getHomeworkContentList",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        status: common.http_status.SUCCESS, 
                        code: common.http_status.HTTP_SUCCESS,
                        message: "List",
                        data : data
                    })
                }
                helper.saveLogs(req,helperData)
           }else{
                res.status(common.http_status.HTTP_BAD_REQUEST).json({
                    code: common.http_status.HTTP_BAD_REQUEST,
                    status: common.http_status.ERROR,
                    message: "Invalid request",
                    data: {}
                })
                let helperData = {
                    APIName : "getHomeworkContentList",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        code: common.http_status.HTTP_BAD_REQUEST,
                        status: common.http_status.ERROR,
                        message: "Invalid request",
                        data: {}
                    })
                }
                helper.saveLogs(req,helperData)
           }
        }catch(e){
            console.log(e)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: e
            })
            let helperData = {
                APIName : "getHomeworkContentList",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: e
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    submitExerciseFeedback : async(req, res)=>{
        let _ = require("lodash");
        var common = require('../common');
        var mongoose = require('mongoose')
        var helper = require('../helpers/common-helper')
        let user_id = req.decoded.user_id
        let lessonId = req.body.lessonId
        let exerciseId = req.body.exerciseId
        let feedBack = req.body.feedBack
        var data = {}
        try {
            var userHomework = await req.models.userHomework.aggregate([
                {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId),exerciseId:mongoose.Types.ObjectId(exerciseId),isFeedBack:true}}
            ])
            if(userHomework.length>0){
                let updatedData = {
                    feedBack : feedBack
                }
                await req.models.userHomework.updateOne({userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId),exerciseId:mongoose.Types.ObjectId(exerciseId)},updatedData)
            }else{
                await req.models.userHomework.deleteOne({userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId),exerciseId:mongoose.Types.ObjectId(exerciseId)})
                let userHomeworkData = {
                    userId : user_id,
                    lessonId : lessonId,
                    exerciseId:exerciseId,
                    isCompleted : true,
                    isEnabled : true,
                    isFeedBack:true,
                    feedBack : feedBack
                }
                let saveFeedback = new req.models.userHomework(userHomeworkData)
                let resultD=await saveFeedback.save()
                let tempCheck = await req.models.userHomework.aggregate([
                    {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId),exerciseId:mongoose.Types.ObjectId(exerciseId),isFeedBack:true}},
                    {$project:{
                        _id:0,
                        isFeedBack:1
                    }}
                ])
                if(tempCheck.length==1){
                    let allHomeworkListCount = await req.models.homework.aggregate([
                       {$match:{
                           lessonId:mongoose.Types.ObjectId(lessonId)
                       }},
                       {$count:"homeWorkCount"}
                    ])
                    let userHomeworkListCount = await req.models.userHomework.aggregate([
                        {$match:{
                            lessonId:mongoose.Types.ObjectId(lessonId),
                            userId:mongoose.Types.ObjectId(user_id),
                            isFeedBack : true
                        }},
                        {$count:"homeWorkCount"}
                     ])
                     if(_.isEqual(allHomeworkListCount, userHomeworkListCount)){
                         //await req.models.userLessons.u
                        let lessons = await req.models.lessons.aggregate([
                            { $sort : { sortOrder : 1 } },
                            {$match:{isDeleted : false}},
                            {
                                $project:{
                                    _id:0,
                                    lessonId:"$_id"
                                }
                            }
                        ])
                        let userLessons = await req.models.userLessons.aggregate([
                            {$match:{userId:mongoose.Types.ObjectId(user_id)}},
                            {
                                $project:{
                                    _id:0,
                                    lessonId:"$lessonId"
                                }
                            }
                        ])
                        var diff = _.differenceWith(lessons, userLessons, _.isEqual);
                        // console.log(diff)
                        // console.log("<<<<<<<<<<>>>>>>>>>")
                        // console.log(lessons,userLessons)
                        let enableNextLesson = {
                            userId : user_id,
                            lessonId : diff[0].lessonId,
                            isCompleted : false,
                            isEnabled : true
                        }
                        let saveEnabledNextLesson = new req.models.userLessons(enableNextLesson)
                        await saveEnabledNextLesson.save()

                        //update lesson to completed
                        let completeLessson = {
                            isCompleted : true
                        }
                        await req.models.userLessons.updateOne({userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId)},completeLessson)
                     }else{
                        let allHomeworkList = await req.models.homework.aggregate([
                            {$match:{lessonId:mongoose.Types.ObjectId(lessonId)}},
                            {
                                $project:{
                                    _id:0,
                                    exerciseId:"$_id"
                                }
                            }
                        ])
                        let userHomeworkList = await req.models.userHomework.aggregate([
                            {$match:{userId: mongoose.Types.ObjectId(user_id),lessonId:mongoose.Types.ObjectId(lessonId)}},
                            {
                                $project:{
                                    _id:0,
                                    exerciseId:"$exerciseId"
                                }
                            }
                        ])
                        
                        var diff = _.differenceWith(allHomeworkList, userHomeworkList, _.isEqual);
                        
                        let enableNextHomework = {
                            userId : user_id,
                            exerciseId : diff[0].exerciseId,
                            lessonId:lessonId,
                            isEnabled : true
                        }
                        let saveEnabledNextHomework = new req.models.userHomework(enableNextHomework)
                        await saveEnabledNextHomework.save()
                     }
                }else{
                    res.status(common.http_status.HTTP_BAD_REQUEST).json({
                        code:common.http_status.HTTP_BAD_REQUEST,
                        status:common.http_status.ERROR,
                        message: "Feedback not submitted.Please try again"
                    })
                    let helperData = {
                        APIName : "submitExerciseFeedback",
                        request: JSON.stringify(req.body),
                        response : JSON.stringify({ 
                            code:common.http_status.HTTP_BAD_REQUEST,
                            status:common.http_status.ERROR,
                            message: "Feedback not submitted.Please try again"
                        })
                    }
                    helper.saveLogs(req,helperData)
                }
            }
            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "Your feedback has been submitted",
                data : data
            });
            let helperData = {
                APIName : "submitExerciseFeedback",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Your feedback has been submitted",
                    data : data
                })
            }
            helper.saveLogs(req,helperData)
        } catch (error) {
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR
            })
            let helperData = {
                APIName : "submitExerciseFeedback",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    getLessonListFixed : async(req, res) =>{
        try{
            let _ = require("lodash");
            var common = require('../common');
            let mongoose = require('mongoose')
            let user_id = req.decoded.user_id
            var lessons = []
            var data = {}
            // let lessonList = await req.models.lessons.find({isDeleted:false})
            console.log(user_id)
            
            var userLessonData = await req.models.userLessons.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(user_id),isEnabled:true}},
                {$project:{
                        _id:0,
                        lessonId:"$lessonId",
                        // isCompleted:"$isCompleted",
                        // isEnabled:"$isEnabled"
                    }
                }
            ])
            var lessons = await req.models.lessons.aggregate([
                {$project:{
                    _id:0,
                    lessonId:"$_id",
                    name:"$name",
                    totalTime:"$totalTime",
                    lessonContents:"$lessonDetails"
                }}
            ])
            var userCurrentLessonData = await req.models.userLessons.aggregate([
                { $match: { userId: mongoose.Types.ObjectId(user_id),isEnabled:true,isFeedBack:true}},
                {$project:{
                        _id:0,
                        lessonId:"$lessonId",
                        isFeedBack:"$isFeedBack",
                        isCompleted:"$isCompleted",
                        // isEnabled:"$isEnabled"
                    }
                }
            ])
        //    console.log(userLessonData)
        //    console.log(userCurrentLessonData)
            
            if(userLessonData.length>0){
                lessons.map(data=>{
                    data.homeWorktotalTime = 1200
                    data.homeWorkName ="Homework"
                    data.isEnabled = false,
                    data.isCompleted = false,
                    data.isFeedBack = false
                    for(i=0;i<userLessonData.length;i++){
                        if(_.isEqual(data.lessonId,userLessonData[i].lessonId)){
                            
                            // if(userCurrentLessonData.length>0 && userCurrentLessonData[i].isFeedBack == true){
                            //     data.isEnabled = true,
                            //     data.isCompleted = userCurrentLessonData[i].isCompleted,
                            //     data.isFeedBack = userCurrentLessonData[i].isFeedBack
                            // }else{
                                data.isEnabled = true,
                                data.isCompleted = false,
                                data.isFeedBack = false
                           // }
                        }
                    }
                    if(userCurrentLessonData.length>0){
                        for(i=0;i<userCurrentLessonData.length;i++){
                            if(_.isEqual(data.lessonId,userCurrentLessonData[i].lessonId)){
                                data.isEnabled = true,
                                data.isCompleted = userCurrentLessonData[i].isCompleted,
                                data.isFeedBack = userCurrentLessonData[i].isFeedBack
                            }
                        }
                    }
                    
                })
            }else{

                lessons.map((data,index)=>{
                    data.homeWorktotalTime = 1200
                    data.homeWorkName ="Homework"
                    data.isEnabled = false,
                    data.isCompleted = false
                    data.isFeedBack = false
                    if(index == 0){
                        data.isEnabled = true,
                        data.isCompleted = false,
                        data.isFeedBack = false
                    }
                })
            }
            data = {lessons}
            
            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "List",
                data : data
            });
        }catch(e){
            console.log(e)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error:e
            })
        }
    },

    recordingTaskList :async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var commonController = require('./CommonController')

            var mongoose = require('mongoose')
            var user_id = req.decoded.user_id

           // let recCount = 0

            let data = {}

            let gender = await commonController.getGender(req)
            let genderFrequency = await helper.getAllGenderFrequency(req)
            let recCount = await req.models.user.findOne({_id : mongoose.Types.ObjectId(user_id)})
            // let countQuery = await req.models.userRecordings.aggregate([
            //     {$match:{userId: mongoose.Types.ObjectId(user_id)}},
            //     { $sort : { count : -1 } }
            // ]) 

            // if(countQuery.length>0){
            //     recCount = countQuery[0].count
            // }else{
            //     recCount = 1
            // }
            // let countRec = {
            //     recCount : recCount
            // }
            var list = await req.models.recordings.aggregate([
                {$match:{isDeleted:false}},
                {
                    $project : {
                        content : 1,
                        contentType : 1,
                        duration : 1,
                        contentOrder : 1,
                        // genderFrequencyData : 1,
                        genderFrequencyData : genderFrequency,
                        gender : gender,
                       // recCount  : recCount

                    }
                }
            ])
           data.taskList  = list
           //console.log("nfnfkrnirbfkregih",recCount.recordingCount)
           if(recCount.recordingCount == undefined){
                data.recCount = 0
           }else{
                data.recCount = recCount.recordingCount
           }
           //data.recCount = recCount.recordingCount

            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "List",
                data : data
            });
            let helperData = {
                APIName : "getRecordings",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS, 
                    message: "List",
                    data : data
                })
            }
            helper.saveLogs(req,helperData)

        } catch (error) {
            console.log(error)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : error
            })
            let helperData = {
                APIName : "getRecordings",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR,
                    error : error
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    saveRecording:async(req, res)=>{
        try{
            //req.setTimeout(0)
            const { getVideoDurationInSeconds } = require('get-video-duration')
            const moment = require("moment");
            var _ = require("lodash");
             var common = require('../common');
             var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')

            var userId = req.decoded.user_id,
            recordingName = req.body.recordingName,
            recordingTaskId = req.body.recordingTaskId,
            avgFrequency = req.body.avgFrequency;
            minFrequency = req.body.minFrequency;
            maxFrequency = req.body.maxFrequency;

            countFromRequest = req.body.count;

            let count = 0
            var file_to_upload = req.files ? req.files.file : '';
            if(file_to_upload){
                //console.log("filedata")
                var filedata=await helper.uploadFile(req,res,['.aac','.m4a','.caf','.wav'])
                //console.log(filedata)
                recordingData = {
                    userId          :   mongoose.Types.ObjectId(userId),
                    recordingTaskId :   mongoose.Types.ObjectId(recordingTaskId),
                    recordingName   :   recordingName,
                    recordingUrl    :   filedata.name,
                    avgFrequency    :   avgFrequency,
                    minFrequency    :   minFrequency,
                    maxFrequency    :   maxFrequency,
                    count           :   countFromRequest

                }
                let checkRecordingSchema = new req.models.userRecordings(recordingData)
                let saveRecordingData = await checkRecordingSchema.save()
                
                let data = await req.models.user.findOne({_id: mongoose.Types.ObjectId(userId)})
                if(saveRecordingData._id != undefined){
                    if(data.recordingCount == undefined){
                        count = 1
                    }else{
                        count = data.recordingCount + 1
                    }
                    let updatedRecordingCount = await req.models.user.updateOne({_id: mongoose.Types.ObjectId(userId)},{$set:{
                        recordingCount : count
                    }})
                }
                let updatedData = await req.models.user.findOne({_id: mongoose.Types.ObjectId(userId)})
                
                

                let result = {}
                result = saveRecordingData.toObject()
                result.count = updatedData.recordingCount
                //console.log(data.recordingCount)

                // sending email to debug
                // replacements = { request: JSON.stringify(req.body),
                //     status: common.http_status.SUCCESS, 
                //     code: common.http_status.HTTP_SUCCESS,
                //     message: "Recording has been saved",
                //     date: moment(new Date()).format("MMMM Do YYYY") };

                // await helper.sendEmail("developer@mobikasa.net","manishmishra@mobikasa.com","API REPORT",'api_report.ejs',replacements);

                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Recording has been saved",
                    data : result
                });

                // find data for notification.
                var ids = await req.models.user.aggregate([
                    {
                        $match: {_id: mongoose.Types.ObjectId(userId)}
                    },
                    {
                      $lookup: {
                        from: 'devices',
                        localField:'_id',
                        foreignField:'userId',
                        as:'devicedata'
                      }
                    },
                    {
                      $unwind: '$devicedata'
                    },
                    {
                      $project:{
                        _id:1,
                        name                      :'$name',
                        email                     :'$email',
                        isPushNotificationEnabled :'$isPushNotificationEnabled',
                        deviceToken               :'$devicedata.deviceToken',
                        deviceId                  :'$devicedata.deviceId',
                        deviceType                : '$devicedata.deviceType',
                        appVersion                : '$devicedata.deviceType'
                      }
                    }
                ])

                //form and call notification function
                let notificationData = {
                    type        : "saveRecording",
                    title       : "Recording saved.",
                    message     : `Your Recording ${req.body.recordingName} has been Saved`,
                    resource    : saveRecordingData._id,
                    req         : req,
                    info        : result
                }

                let userAndNotificationData = {};
                userAndNotificationData.userData            = ids
                userAndNotificationData.notificationData    = notificationData
                await helper.sendPushNotification(userAndNotificationData)

                // stream and find duration of audio
                let durationData = await getVideoDurationInSeconds(process.env.BUCKET_ACCESS_URL+'common/'+ saveRecordingData.recordingUrl)

                //save duration in user recording data
                await req.models.userRecordings.findByIdAndUpdate({_id:mongoose.Types.ObjectId(saveRecordingData._id)},{duration : durationData})

                let helperData = {
                    APIName : "saveRecording",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        status: common.http_status.SUCCESS, 
                        code: common.http_status.HTTP_SUCCESS,
                        message: "Recording has been saved",
                        data : saveRecordingData
                    })
                }
                helper.saveLogs(req,helperData)
            }else{
                // sending email report
                // replacements = { request: JSON.stringify(req.body),
                //     status: common.http_status.ERROR, 
                //     code: common.http_status.HTTP_NOT_FOUND,
                //     message: "Please send a recording file",
                //     date: moment(new Date()).format("MMMM Do YYYY") };

                // await helper.sendEmail("developer@mobikasa.net","manishmishra@mobikasa.com","API REPORT",'api_report.ejs',replacements);

                res.status(common.http_status.HTTP_NOT_FOUND).json({ 
                    status: common.http_status.ERROR, 
                    code: common.http_status.HTTP_NOT_FOUND,
                    message: "Please send a recording file",
                    data : {}
                });
                let helperData = {
                    APIName : "saveRecording",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        status: common.http_status.ERROR, 
                        code: common.http_status.HTTP_NOT_FOUND,
                        message: "Please send a recording file",
                        data : {}
                    })
                }
                helper.saveLogs(req,helperData)
            }
        } catch (error){
            //sending api report email
            // replacements = { request: JSON.stringify(req.body),
            //     code:common.http_status.INTERNAL_SERVER_ERROR,
            //     status:common.http_status.ERROR,
            //     message: JSON.stringify(error),
            //     date: moment(new Date()).format("MMMM Do YYYY") };

            // await helper.sendEmail("developer@mobikasa.net","manishmishra@mobikasa.com","API REPORT",'api_report.ejs',replacements);
            
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : JSON.stringify(error)
            })
            console.log("error in catch block",JSON.stringify(error))
            let helperData = {
                APIName : "saveRecording",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR,
                    error : error
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    userRecordingList :async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var commonController = require('./CommonController')

            var mongoose = require('mongoose')
            var user_id = req.decoded.user_id
            console.log(user_id)
            let gender = await commonController.getGender(req)
            //console.log(gender,"here")
            let genderFrequency = await helper.getAllGenderFrequency(req)
            var data = await req.models.userRecordings.aggregate([
                {$match:{userId: mongoose.Types.ObjectId(user_id)}},
                { $sort : { count : 1 } },
                {
                    $lookup: {
                      from: 'recordings',
                      'let': { recordingTaskId: '$recordingTaskId', recordingUrl: '$recordingUrl',avgFrequency:'$avgFrequency' },
                      pipeline: [
                        {
                          $match: {
                            $expr: {
                              
                              $and: [
                                { $eq: ['$_id', '$$recordingTaskId'] },
                              ]
                            }
                          }
                        }
                      ],
                      as: 'data'
                    }
                  },
                  {
                    $unwind: '$data'
                  },
                {
                    $project : {
                        userId: '$userId',
                        gender : gender,
                        //recCount: '$count',
                        recordingTaskId: '$recordingTaskId',
                        recordingName: '$recordingName',
                        recordingUrl:`$recordingUrl`,
                        avgFrequency:'$avgFrequency',
                        minFrequency:'$minFrequency',
                        maxFrequency:'$maxFrequency',
                        recordingContentName:'$data.recordingName',
                        recordingContent : '$data.content',
                        // genderFrequencyData : '$data.genderFrequencyData',
                        genderFrequencyData : genderFrequency,
                        createdAt: '$createdAt'

                    }
                }
            ])
            if(data. length > 0){
                data.map(newData=>{
                    newData.recordingUrl = process.env.BUCKET_ACCESS_URL+'common/'+ newData.recordingUrl
                    //newData.gender = gender
                })
            }
            
            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "List",
                data : data
            });
            let helperData = {
                APIName : "userRecordingList",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS, 
                    message: "List",
                    data : data
                })
            }
            helper.saveLogs(req,helperData)

        } catch (error) {
            console.log(error)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : error
            })
            let helperData = {
                APIName : "userRecordingList",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR,
                    error : error
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    updateRecordingName : async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')
            var userId = req.decoded.user_id
            console.log(userId)
            var recordingListId = req.body.recordingListId
            var recordingName = req.body.recordingName 

            let recording = await req.models.userRecordings.aggregate([
                {$match:{_id:mongoose.Types.ObjectId(recordingListId),userId: mongoose.Types.ObjectId(userId)}}
            ])

            if(recording.length > 0){
                var result = await req.models.userRecordings.findByIdAndUpdate(mongoose.Types.ObjectId(recordingListId), {recordingName:recordingName})
                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Recording name has been updated",
                    data : {}
                });
                let helperData = {
                    APIName : "updateRecordingName",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        status: common.http_status.SUCCESS, 
                        code: common.http_status.HTTP_SUCCESS,
                        message: "Recording name has been updated",
                        data : {}
                    })
                }
                helper.saveLogs(req,helperData)
            }else{
                res.status(common.http_status.HTTP_BAD_REQUEST).json({ 
                    status: common.http_status.ERROR, 
                    code: common.http_status.HTTP_BAD_REQUEST,
                    message: "Please enter valid ID",
                    data : {}
                });
                let helperData = {
                    APIName : "updateRecordingName",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        status: common.http_status.ERROR, 
                        code: common.http_status.HTTP_BAD_REQUEST, 
                        message: "Please enter valid ID",
                        data : {}
                    })
                }
                helper.saveLogs(req,helperData)
            }
        } catch (error) {
            console.log(error)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : error
            })
            let helperData = {
                APIName : "updateRecordingName",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR,
                    error : error
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    deleteUserRecording: async(req, res) => {
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')
            var userId = req.decoded.user_id

          let recordingListId = req.params.recordingListId
         
            //delete Question
            let isAvailable = await req.models.userRecordings.aggregate([
                {$match:{_id: mongoose.Types.ObjectId(recordingListId),userId: mongoose.Types.ObjectId(userId)}}
            ]);
            if (isAvailable.length>0) {
              await req.models.userRecordings.deleteOne({_id: mongoose.Types.ObjectId(recordingListId)});
              res.status(common.http_status.HTTP_SUCCESS).json({ code: common.http_status.HTTP_SUCCESS, status: common.http_status.SUCCESS, message: "Your recording has been deleted",data:{}})
              let helperData = {
                    APIName : "deleteUserRecording",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ code: common.http_status.HTTP_SUCCESS, status: common.http_status.SUCCESS, message: "Your recording has been deleted",data:{}})
                }
                helper.saveLogs(req,helperData)
            } else {
              res.status(common.http_status.HTTP_NOT_FOUND).json({ code: common.http_status.HTTP_NOT_FOUND, status: common.http_status.ERROR, message: "Please send valid ID",data:{} })
              let helperData = {
                APIName : "deleteUserRecording",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ code: common.http_status.HTTP_NOT_FOUND, status: common.http_status.ERROR, message: "Please send valid ID" ,data:{}})
            }
            helper.saveLogs(req,helperData)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
            let helperData = {
                APIName : "deleteUserRecording",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ status: false, code: 500, message: "Something went wrong." + err})
            }
            helper.saveLogs(req,helperData)
        }
    },

    changePassword : async(req,res) =>{
        try {
            var helper = require('../helpers/common-helper')
            var bcrypt = require('bcryptjs');
            var common = require('../common')
            var mongoose = require('mongoose')

            let user_id = req.decoded.user_id
            let userData = await req.models.user.aggregate([
                {$match:{_id:mongoose.Types.ObjectId(user_id)}}
            ]);

            let comparePassword = await bcrypt.compare(req.body.oldPassword,userData[0].password);
            
            if(comparePassword){
                let hash = bcrypt.hashSync(req.body.newPassword,10);
                var result = await req.models.user.findByIdAndUpdate(mongoose.Types.ObjectId(user_id), {password:hash})
                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Password has been updated",
                    data : {}
                });
                req.body = {}
                let helperData = {
                    APIName : "api/changePassword",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        status: common.http_status.SUCCESS, 
                        code: common.http_status.HTTP_SUCCESS,
                        message: "Password has been updated",
                        data : {}
                    })
                }
                helper.saveLogs(req,helperData)

            }else{
                res.status(common.http_status.HTTP_BAD_REQUEST).json({ code: common.http_status.HTTP_BAD_REQUEST, status: common.http_status.ERROR, message: "Incorrect password",data:{} })
                req.body = {}
                let helperData = {
                    APIName : "api/changePassword",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ code: common.http_status.HTTP_BAD_REQUEST, status: common.http_status.ERROR, message: "Incorrect password" ,data:{}})
                }
                helper.saveLogs(req,helperData)
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + error});
            req.body = {}
            let helperData = {
                APIName : "api/changePassword",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ status: false, code: 500, message: "Something went wrong." + error})
            }
            helper.saveLogs(req,helperData)
        }
    },

    logout : async(req, res) =>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')

            var user_id = req.decoded.user_id
            console.log("1")
            await req.models.device.deleteMany({userId : mongoose.Types.ObjectId(user_id)})
            console.log("2")
            await req.models.user.findByIdAndUpdate(mongoose.Types.ObjectId(user_id), {accessToken:" "
            })
            console.log("3")
            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "Logged Out",
                data : {}
            });
            let helperData = {
                APIName : "api/logout",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Logged Out",
                    data : {}
                })
            }
            helper.saveLogs(req,helperData)

        } catch (error) {
            console.log(error)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + error});
            let helperData = {
                APIName : "api/logout",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ status: false, code: 500, message: "Something went wrong." + error})
            }
            helper.saveLogs(req,helperData)
        }
    },

    settings : async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')
           var user_id = req.decoded.user_id 
           var data = {
             isPushNotificationEnabled : req.body.isPushNotificationEnabled,
             isCallNotificationEnabled : req.body.isCallNotificationEnabled
           }

           var result = await req.models.user.findByIdAndUpdate(mongoose.Types.ObjectId(user_id), data)
                res.status(common.http_status.HTTP_SUCCESS).json({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Settings has been updated",
                    data : {}
                });
                req.body = {}
                let helperData = {
                    APIName : "api/settings",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ 
                        status: common.http_status.SUCCESS, 
                        code: common.http_status.HTTP_SUCCESS,
                        message: "Settings has been updated",
                        data : {}
                    })
                }
                helper.saveLogs(req,helperData)

            
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + error});
            let helperData = {
                APIName : "api/settings",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ status: false, code: 500, message: "Something went wrong." + error})
            }
            helper.saveLogs(req,helperData)
        }
    },

    getSettings : async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')
            var user_id = req.decoded.user_id 

            data = {}

           var settings = await req.models.user.aggregate([
               {$match:{_id: mongoose.Types.ObjectId(user_id)}},
               {$project:
                    {
                        _id:1,
                        isPushNotificationEnabled:1,
                        isCallNotificationEnabled:1
                    }
                }
           ])
            data = {...settings[0]}
            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "Settings",
                data : data
            });
            let helperData = {
                APIName : "api/getSettings",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Settings",
                    data : data
                })
            }
            helper.saveLogs(req,helperData)

            
        } catch (error) {
            console.log(error)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + error});
            let helperData = {
                APIName : "api/getSettings",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ status: false, code: 500, message: "Something went wrong." + error})
            }
            helper.saveLogs(req,helperData)
        }
    },

    setReminder : async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')

            let user_id = req.decoded.user_id
            let reminderTime = req.body.reminderTime
            let repeatType = req.body.repeatType
            let reminder = {
                userId              : user_id,
                reminderTime        : reminderTime,
                nextReminderTime    : reminderTime,
                repeatType          : repeatType
            }
            let checkReminderSchema = new req.models.reminder(reminder)
            let saveReminderData = await checkReminderSchema.save()

            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "Reminder has been saved",
                data : saveReminderData
            });

            let helperData = {
                APIName : "setReminder",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Reminder has been saved",
                    data : saveReminderData
                })
            }
            helper.saveLogs(req,helperData)
        } catch (error) {
            console.log(error)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : error
            })
            let helperData = {
                APIName : "setReminder",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR,
                    error : error
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    deleteReminder : async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')
            var user_id = req.decoded.user_id

            let reminderId = req.params.reminderId
         
            //delete Question
            let isAvailable = await req.models.reminder.aggregate([
                {$match:{_id: mongoose.Types.ObjectId(reminderId),userId: mongoose.Types.ObjectId(user_id)}}
            ]);
            if (isAvailable.length>0) {
              await req.models.reminder.deleteOne({_id: mongoose.Types.ObjectId(reminderId)});
              res.status(common.http_status.HTTP_SUCCESS).json({ code: common.http_status.HTTP_SUCCESS, status: common.http_status.SUCCESS, message: "Your reminder has been deleted",data:{}})
              let helperData = {
                    APIName : "deleteReminder",
                    request: JSON.stringify(req.body),
                    response : JSON.stringify({ code: common.http_status.HTTP_SUCCESS, status: common.http_status.SUCCESS, message: "Your reminder has been deleted",data:{}})
                }
                helper.saveLogs(req,helperData)
            } else {
              res.status(common.http_status.HTTP_NOT_FOUND).json({ code: common.http_status.HTTP_NOT_FOUND, status: common.http_status.ERROR, message: "Please send valid ID",data:{} })
              let helperData = {
                APIName : "deleteReminder",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ code: common.http_status.HTTP_NOT_FOUND, status: common.http_status.ERROR, message: "Please send valid ID" ,data:{}})
            }
            helper.saveLogs(req,helperData)
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
            let helperData = {
                APIName : "deleteReminder",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ status: false, code: 500, message: "Something went wrong." + err})
            }
            helper.saveLogs(req,helperData)
        }
    },

    reminderList : async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')

            let user_id = req.decoded.user_id

            var data = await req.models.reminder.aggregate([
                {
                    $match:{userId: mongoose.Types.ObjectId(user_id)}
                },
                { $sort : { createdAt : 1 } },
                // {
                //     $project:{

                //     }
                // }
            ])
            
            if(data.length>0){
                data.map((newData,index)=>{
                    newData.reminderName = `Reminder ${index+1}`
                })
            }

            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "List",
                data : data
            });

            let helperData = {
                APIName : "reminderList",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    status: common.http_status.SUCCESS, 
                    code: common.http_status.HTTP_SUCCESS,
                    message: "List",
                    data : data
                })
            }
            helper.saveLogs(req,helperData)
            
        } catch (error) {
            console.log(error)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : error
            })
            let helperData = {
                APIName : "reminderList",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR,
                    error : error
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    changeReminderStatus : async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')

            var messageKey = "on"

            let user_id = req.decoded.user_id
            let status = req.body.status
            let reminderId = req.body.reminderId

            let updatedStatus = await req.models.reminder.findByIdAndUpdate(mongoose.Types.ObjectId(reminderId),{ status: status})

            if(status==false){
                messageKey = "off"
            }
                 
            
            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: `Your reminder has been turned ${messageKey}`,
            });


        } catch (error) {
            console.log(error)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : error
            })
            let helperData = {
                APIName : "changeReminderStatus",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR,
                    error : error
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    editReminder : async(req, res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')

            let reminderId = req.body.reminderId
            let data = {
                reminderTime        : req.body.reminderTime,
                nextReminderTime    : req.body.reminderTime,
                repeatType          : req.body.repeatType,
                isAllDay            : req.body.isAllDay
            }
            
            let updatedStatus = await req.models.reminder.findByIdAndUpdate(mongoose.Types.ObjectId(reminderId),data)

            let newRecord = await req.models.reminder.aggregate([
                {$match:{_id: mongoose.Types.ObjectId(reminderId)}}
            ])

            let newData = newRecord[0]
            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: `Your reminder has been updated`,
                data :newData
            });


        } catch (error) {
            console.log(error)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : error
            })
            let helperData = {
                APIName : "editReminder",
                request: JSON.stringify(req.body),
                response : JSON.stringify({ 
                    code:common.http_status.INTERNAL_SERVER_ERROR,
                    status:common.http_status.ERROR,
                    message: common.message.INTERNAL_SERVER_ERROR,
                    error : error
                })
            }
            helper.saveLogs(req,helperData)
        }
    },

    notificationList : async(req , res)=>{
        try {
            var _ = require("lodash");
            var common = require('../common');
            var helper = require('../helpers/common-helper')
            var mongoose = require('mongoose')

            let user_id = req.decoded.user_id

            var data = await req.models.notification.aggregate([
                {
                    $match:{toId: mongoose.Types.ObjectId(user_id)}
                },
                { $sort : { createdAt : -1 } },
                // {
                //     $project:{

                //     }
                // }
            ])
            
            // if(data.length>0){
            //     data.map((newData,index)=>{
            //         newData.reminderName = `Reminder ${index+1}`
            //     })
            // }

            res.status(common.http_status.HTTP_SUCCESS).json({ 
                status: common.http_status.SUCCESS, 
                code: common.http_status.HTTP_SUCCESS,
                message: "List",
                data : data
            });

        } catch (error) {
            console.log(error)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
                code:common.http_status.INTERNAL_SERVER_ERROR,
                status:common.http_status.ERROR,
                message: common.message.INTERNAL_SERVER_ERROR,
                error : error
            })
        }
    }
}

module.exports = {
    saveAccessCode : async(req,res)=>{
        try{
            const mongoose = require('mongoose')
            const common = require('../common')
            const AccessCodeModel = req.models.accessCode

            let data = {
                id : req.body.id,
                accessCode : req.body.accessCode,
                isEnabled :req.body.isEnabled
            } 

            if(data.id){
                let isAvailable = await AccessCodeModel.findById({_id: mongoose.Types.ObjectId(data.id)})
                if(isAvailable){
                    await AccessCodeModel.findByIdAndUpdate({_id:mongoose.Types.ObjectId(data.id)},data)
                    res.status(common.http_status.HTTP_SUCCESS).json({code:common.http_status.HTTP_SUCCESS,status:common.http_status.SUCCESS,message:common.message.ADMIN.ACCESS_CODE.UPDATED})
                }else{
                    res.status(common.http_status.HTTP_NOT_FOUND).json({code:common.http_status.HTTP_NOT_FOUND,status:common.http_status.ERROR,message:common.message.ADMIN.ACCESS_CODE.NOT_EXISTS})
                }
            }else{
                let accessCodeToBeAdded = new AccessCodeModel(req.body)
                await accessCodeToBeAdded.save()
                res.status(common.http_status.HTTP_SUCCESS).json({code:common.http_status.HTTP_SUCCESS,status:common.http_status.SUCCESS,message:common.message.ADMIN.ACCESS_CODE.SUCCESS})
            }
        }catch(err){
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
    },

    createAdmin : async(req,res)=>{
        try{
            var helper = require('../helpers/common-helper')
            const _ = require('lodash');
            const bcrypt = require('bcryptjs');
            const siteAdmin = req.models.siteAdmin
            
            
            const email = req.body.email
            const name = req.body.name
            const telephoneNumber = req.body.telephoneNumber
            let hash = bcrypt.hashSync(req.body.password,10);
            req.body.password = hash;
            let user = new siteAdmin(req.body)

            //Check if users already exists or not
            let userData = await req.models.siteAdmin.findOne({email:req.body.email})
            console.log(userData)
            if(userData == null){
                //save user data in database
                let saveUsers = await user.save();
                let finalData = saveUsers.toObject()

                //function to save profile image
                //function for otp verification

                delete finalData.answers
                delete finalData.__v
                delete finalData.password
                res.status(200).json({ status: true, code: 200,data: finalData, message: "Admin has been successfully registered."});
                
                
            }else{
                
                    //console.log("here",userData)
                    res.status(400).json({ status: false, code: 200, message: "User with email already exists.Please login using your account"});
            }
        }catch(err){
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }

    },

    // saveQuestionnaire: async(req, res) => {
    //     try {
    //     const mongoose = require('mongoose');
    //     const Question = req.models.questions;
    //     const QuestionOptions = req.models.questionOptions;
    //     const common = require('../common')
    //     //  let questionData = req.body.questionData
    //      let id = req.body.id
    //     //  let questionOptions= questionData.questionOptions
    //     //  let finalQuestionData = questionData
    //     //  delete finalQuestionData.questionOptions
    //      var upsertQuestion;
         
    //     //  if(id){
           
    //       upsertQuestion = await Question.findByIdAndUpdate({_id:mongoose.Types.ObjectId(id)},finalQuestionData);
    //       console.log(upsertQuestion)
    //       return
    //       if(upsertQuestion){
    //         for(var i = 0;i<questionOptions.length;i++){
    //           //upload image
             
    //          upsertQuestionOption =  await QuestionOptions.updateOne({questionId:upsertQuestion._id,_id:mongoose.Types.ObjectId(questionOptions[i].answerId)},{$set:questionOptions[i]})
    //         }
    //       }else{
    //         res.status(common.http_status.HTTP_NOT_FOUND).json({status:common.http_status.ERROR,code:common.http_status.HTTP_NOT_FOUND,message:"Questionnaire not found"})
    //       }
          
    //     //  }else{

    //     //   upsertQuestion = new req.models.questions(finalQuestionData)
    //     //   await upsertQuestion.save()
    //     //   for(var i = 0;i<questionOptions.length;i++){
    //     //     //upload image
            
    //     //     questionOptions[i].questionId = upsertQuestion._id
    //     //    upsertQuestionOption = new req.models.questionOptions(questionOptions[i])
    //     //    await upsertQuestionOption.save() 
    //     //   }
    //     //  }
    //      res.status(common.http_status.HTTP_SUCCESS).json({status:common.http_status.SUCCESS,code:common.http_status.HTTP_SUCCESS,message:"Questionnaire saved successfully"})
    //     //  let questionId = mongoose.Types.ObjectId(upsertQuestion.upserted[0]._id)
    //     //  console.log(questionId)
    //     //  questionOptions.map(data =>{
    //     //    data.questionId = questionId
    //     //  })
    //     //  console.log(questionOptions)
    //     //  var upsertQuestionOption;
    //     //  for(var i = 0;i<questionOptions.length;i++){
    //     //    //upload image
    //     //   upsertQuestionOption =  await req.models.questionOptions.findOneAndUpdate({questionId:questionId,value:questionOptions[i].value},questionOptions[i],{upsert:true, new:true})
    //     //  }
    //     //  console.log("here",upsertQuestionOption)
    //     //  if((upsertQuestion.ok || upsertQuestion.nModified) && upsertQuestionOption._id){
    //     //   res.status(common.http_status.HTTP_SUCCESS).json({status:common.http_status.SUCCESS,code:common.http_status.HTTP_SUCCESS,message:"Questionnaire saved successfully"})
    //     //  }else{
    //     //   res.status(common.http_status.HTTP_BAD_REQUEST).json({status:common.http_status.SUCCESS,code:common.http_status.HTTP_BAD_REQUEST,message:"Questionnaire cannot be saved"})
    //     //  }
          
    //     } catch (err) {
    //         console.log(err)
    //         res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
    //     }
    // },

    deleteQuestionnaire: async(req, res) => {
        try {
        const mongoose = require('mongoose');
        const Question = req.models.questions;
        const common = require('../common')

          let id = req.params.id
          if (id) {
            //delete Question
            let isAvailable = await Question.findById({_id: mongoose.Types.ObjectId(id)});
            if (isAvailable) {
              await Question.deleteOne({_id: mongoose.Types.ObjectId(id)});
              res.status(common.http_status.HTTP_SUCCESS).json({ code: common.http_status.HTTP_SUCCESS, status: common.http_status.SUCCESS, message: common.message.ADMIN.DELETE_QUESTIONNAIRE.DELETED })
            } else {
              res.status(common.http_status.HTTP_NOT_FOUND).json({ code: common.http_status.HTTP_NOT_FOUND, status: common.http_status.ERROR, message: common.message.ADMIN.DELETE_QUESTIONNAIRE.NOT_EXISTS })
            }
          }
        } catch (err) {
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
    },
    deleteUser: async(req,res) =>{
      try {
        const mongoose = require('mongoose');
        const User = req.models.user;
        const common = require('../common')

          let id = req.params.id
          if (id) {
            //delete User
            let isAvailable = await User.findById({_id: mongoose.Types.ObjectId(id)});
            if (isAvailable) {
              await User.deleteOne({_id: mongoose.Types.ObjectId(id)});
              res.status(common.http_status.HTTP_SUCCESS).json({ code: common.http_status.HTTP_SUCCESS, status: common.http_status.SUCCESS, message: common.message.ADMIN.DELETE_QUESTIONNAIRE.DELETED })
            } else {
              res.status(common.http_status.HTTP_NOT_FOUND).json({ code: common.http_status.HTTP_NOT_FOUND, status: common.http_status.ERROR, message: common.message.ADMIN.DELETE_QUESTIONNAIRE.NOT_EXISTS })
            }
          }
        } catch (err) {
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
    },

    deleteAccessCode: async(req, res) => {
        try {
        const mongoose = require('mongoose');
        const AccessCodeModel = req.models.accessCode
        const common = require('../common')

          let id = req.params.id
          if (id) {
            //delete Question
            let isAvailable = await AccessCodeModel.findById({_id: mongoose.Types.ObjectId(id)});
            if (isAvailable) {
              await AccessCodeModel.findByIdAndUpdate({_id: mongoose.Types.ObjectId(id)},{
                isEnabled : false
              },
              {upsert: true, new: true});
              res.status(common.http_status.HTTP_SUCCESS).json({ code: common.http_status.HTTP_SUCCESS, status: common.http_status.SUCCESS, message: common.message.ADMIN.DELETE_ACCESS_CODE.DELETED })
            } else {
              res.status(common.http_status.HTTP_NOT_FOUND).json({ code: common.http_status.HTTP_NOT_FOUND, status: common.http_status.ERROR, message: common.message.ADMIN.DELETE_ACCESS_CODE.NOT_EXISTS })
            }
          }
        } catch (err) {
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
    },

    getAllUsersList: async(req, res) =>{
        try{
            const mongoose = require('mongoose');
            const helper = require('../helpers/common-helper')
            const common = require('../common')
            const User = req.models.user
            var data = {}
            let orderBy = req.query.sortOrder || 'asc',
            sortBy = req.query.sortBy || 'name',
            limit = 20
            search = req.query.query || '',
            page_number = parseInt(req.query.page || 1);
            User.find()
              .or([{ name: search }, { email: search }])
              .and([{admin: false}])
              .select(['name','email','DOB','gender','admin'])
              .limit(limit)
              .skip(limit*(page_number-1))
              .sort({
                name: orderBy
              })
              .exec(function(err, result) {
                if(result){
                  User.countDocuments().exec(function(err, count) {
                    if(count){
                      data.totalRecords = count
                      data.recordsPerPage = limit
                      data.currentPage = page_number
                      data.sortOrder = [{
                          "key": "asc",
                          "value": "Ascending"
                        },
                        {
                          "key": "desc",
                          "value": "Descending"
                        }
                      ];
                      data.rows = {...result};
                      console.log(data)
                      res.status(common.http_status.HTTP_SUCCESS).json({status:common.http_status.SUCCESS,code:common.http_status.HTTP_SUCCESS,message:"Data fetched successfully",data:data})
                      
                    }else{
                      console.log(err)
                    }
                  })
                }else{
                  console.log(err)
                }
              })
        }catch(err){
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
    },

    addQuestions: async(req,res)=>{
    //   let mongoose = require('mongoose');
    //   let questionData = {
    //     question :"What is your date of Birth?",
    //     questionType: "radio",
    //     maxAllowedAnswers: 1,
    //     maxCharacter: 20,
    //     isDeleted:0,
    //     screen:2
    //   };
    //   let questionOptionsData = [{
    //     value:"No",
    //     optionImg: "no.jpg",
    //     optionDesc: ""
    //   },
    //   {
    //     value:"Yes",
    //     optionImg: "yes.jpg",
    //     optionDesc: ""
    //   }]

    //   let newQuestion = new req.models.questions(questionData);
    //   questionOptionsData.questionId = newQuestion._id;
    //   let newQuestionOptions = new req.models.questionOptions(questionOptionsData)

    //   newQuestion.save();
    //   newQuestionOptions.save();
    },

    saveQuestionnaire: async(req, res)=>{
      try{
        const mongoose = require('mongoose');
        const common = require('../common')
        const Question = req.models.questions;
        const QuestionOptions = req.models.questionOptions;
        var questionData = req.body.questionData
        var copyquestionData = questionData
        
        if(copyquestionData.questionOptions){
          questionOptions = copyquestionData.questionOptions
        }else{
          questionOptions = [{
            "value":"",
            "optionImg": "",
            "optionDesc": ""
          }]
        }
        questionOptions = questionOptions
        var id = req.body.questionData.id
        delete copyquestionData.questionOptions

        if(id){
          updateQuestion = await Question.findByIdAndUpdate({_id:mongoose.Types.ObjectId(id)},copyquestionData);
          if(questionOptions.length){
            let deleteExistingOptions = await QuestionOptions.deleteMany({questionId:mongoose.Types.ObjectId(id)})
            for(var i = 0;i<questionOptions.length;i++){
              questionOptions[i].sortOrder = i+1
              questionOptions[i].questionId = id
              let addQuestionOptions = new QuestionOptions(questionOptions[i])
              await addQuestionOptions.save()
            }
          }
        }else{
          let addQuestion = new Question(copyquestionData)
          let savedQuestion = await addQuestion.save();
          //console.log("ye",savedQuestion)
          if(questionOptions.length){
            for(var i = 0;i<questionOptions.length;i++){
              questionOptions[i].sortOrder = i+1
              questionOptions[i].questionId = addQuestion._id
              let addQuestionOptions = new QuestionOptions(questionOptions[i])
              await addQuestionOptions.save()
            }
          }
          // console.log(addQuestion)

        }
        res.status(common.http_status.HTTP_SUCCESS).json({status:common.http_status.SUCCESS,code:common.http_status.HTTP_SUCCESS,message:"Questionnaire saved successfully"})
      }catch(err){
        console.log(err)
        res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
      }
    },

    deleteAnswer: async(req,res)=>{
      let isDeleted = await req.models.answers.deleteMany({});
      console.log(isDeleted)
    },

    adminSendNotification : async(req, res)=>{
      try{
        var _ = require("lodash");
        var common = require('../common');
        var helper = require('../helpers/common-helper')
        var mongoose = require('mongoose')
        var data = {}
        var userId = []
        var optionType = req.body.optionType //all or selected
        var sendToIds = req.body.sendToIds
        var notificationTitle = req.body.notificationTitle
        var notificationMessage = req.body.notificationMessage
        var notificationType = req.body.notificationType //push,email or both
        if(optionType == 'all'){
          var ids = await req.models.user.aggregate([
            {$match:{isDeleted:false}},
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
                name:'$name',
                email:'$email',
                isPushNotificationEnabled :'$isPushNotificationEnabled',
                deviceToken:'$devicedata.deviceToken',
                deviceId:'$devicedata.deviceId',
                deviceType: '$devicedata.deviceType',
                appVersion : '$devicedata.deviceType'
              }
            }
          ])
        }else{
         // console.log(sendToIds)
          for(i=0;i<sendToIds.length;i++){
            //console.log(sendToIds[i])
            userId.push(mongoose.Types.ObjectId(`${sendToIds[i]}`))
          }
          var ids = await req.models.user.aggregate([
            {$match: {
              $expr: {
                $in: ["$_id", userId]}}},
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
        }
        data.req = req
        data.notificationTitle = notificationTitle,
        data.notificationMessage = notificationMessage
        data.userdata = ids
        if(notificationType == 'push'){
          helper.sendPushNotificationAdmin(data)
        }else if(notificationType == 'email'){
          helper.sendEmailNotificationAdmin(data)
        }else{
          helper.sendPushNotificationAdmin(data)
          helper.sendEmailNotificationAdmin(data)
        }
        res.status(common.http_status.HTTP_SUCCESS).json({status:common.http_status.SUCCESS,code:common.http_status.HTTP_SUCCESS,message:"Notification sent successfully"})  
      }catch(e){
        console.log(e)
        res.status(500).json({ status: false, code: 500, message: "Something went wrong." + e});
      }
    },

    notificationList : async(req ,res)=>{
        var _ = require("lodash");
        var common = require('../common');
        var helper = require('../helpers/common-helper')
        var mongoose = require('mongoose')
      try {
        var data =await req.models.notification.aggregate([
          // {$lookup : {
          //     from: 'users',
          //     localField:'toId',
          //     foreignField:'_id',
          //     as:'userdata'
          //   }
          // },
          // {
          //   $match:{ $or: [{ name:'manish'},{ email: 'manish'}] }
          // },
          // // {
          // //   $project:{
          // //     _id:1,
          // //     name:'$userdata.name',
          // //     email:'$userdata.email'
          // //   }
          // // }
          {
            $lookup: {
              from: 'users',
              // Escape 'let' because its a reserved word in JS
              // `let` is where you pull in variables from the 'StockHolding' table
              // to use in your `$expr`
              'let': { toId: '$toId', shares: '$message' },
              pipeline: [
                {
                  $match: {
                    $expr: {
                      // Weird but `$expr` must have exactly one key, so you need to
                      // use `$and`, otherwise you get an error 'MongoError: An
                      // object representing an expression must have exactly one field'
                      $and: [
                        // Fields prefixed with one '$' are in the 'Stock' collection,
                        // that is, the `from` collection. Fields prefixed with '$$'
                        // are from the `let` above
                        { $eq: ['$_id', '$$toId'] },
                        //{$regexMatch: { input: "$email", regex: /manishmishra21@hotmail.com/ }}
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
              userId            : '$data._id',
              name              : '$data.name',
              message           : '$data.message',
              notificationType  : '$notificationType',
              sentTo            : '$sentTo',
              sentFrom          : '$sentFrom',
              title             : '$title',
              message           : '$message',
            }
          }
        ])
        res.status(common.http_status.HTTP_SUCCESS).json({status:common.http_status.SUCCESS,code:common.http_status.HTTP_SUCCESS,data:data,message:"Notification list"})
       // res.send(data)
      } catch (error) {
        console.log(error)
        res.status(500).json({ status: false, code: 500, message: "Something went wrong." + e});
      }
    }



}
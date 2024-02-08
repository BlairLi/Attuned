module.exports = {
    login: async(req,res) => {
        try{
            sessionData = req.session;
            
            if(req.method == 'POST'){
                var helper = require('../../helpers/common-helper')
                const bcrypt = require('bcryptjs');
                const common = require('../../common')
                const moment = require("moment")
                const User = req.models.user
                let email = req.body.email
                let user = await req.models.siteAdmin.findOne({email:email});
    
                if(user){
                    
                    let comparePassword = await bcrypt.compare(req.body.password,user.password);
                    console.log(comparePassword)
                    if(comparePassword){

                               
                        if(common.constants.USER_ROLE.indexOf(user.role) > -1){
                            let userData = Object.assign(user);
                                    
                            // Set user data on session object
                            sessionData.user = userData;
                            //console.log(sessionData)  
                            res.redirect('/admin/dashboard')   
                            // res.render('admin/dashboard', {
                            //     error: false,
                            //     message: "Successfully login!",
                            // });
                            
                        }else{
                            res.render('admin/index', {
                                error: true,
                                message: "Un-authorized acces!"
                            });                            
                        }
                    }else{
                        res.render('admin/index', {
                            error: true,
                            message: common.message.LOGIN.FAILED
                        });
                    }
                }else{
                    console.log("login failed");
                    //sessionData.error = common.message.LOGIN.FAILED;
                    res.render('admin/index', {
                        error: true,
                        message: common.message.LOGIN.FAILED
                    });

                }

            }else{
               
                if(sessionData.user){
                    res.redirect('/admin/dashboard') 
                    // return res.render('admin/dashboard', {
                    //     error: false,
                    //     message: "Successfully login!",
                    // });
                }else{
                    return res.render('admin/index', {
                        title: 'Login Page',
                        error: false,
                        message: ""
                        // data: finalCountryData,
                        // errorMessage:"",
                        // domainUrl : "https://" ,
                        // ampUrl: ampUrl,
                        // searchQuery: searchQuery
                    });
                }

            }           

            
        }catch(err){
            console.log(err)
            res.status(500).json({ status: false, code: 500, message: "Something went wrong." + err});
        }
    },
    logout:async(req,res) =>{
        if (req.session) {
            // delete session object
            req.session.destroy(function(err) {
              if(err) {
                return next(err);
              } else {
                console.log("in logout success",req.session)
                return res.redirect('/admin');
              }
            });
        }
        console.log("in logout",req.session)
    },
    getUsersList: async(req,res) =>{
        let search = req.query.search;
        let common = require('../../common');
        let userList;
        let perPage = common.constants.RECORDS_PER_PAGE
        let currentPage = req.query.page || 0
        let page = Math.max(0, currentPage)
        // console.log(page,currentPage)
        // console.log("user",req.session.user)
        if(search){
            userList = await req.models.user.find({
                $or:[
                    {
                        name:{$regex:search,$options: 'i'}
                    },{
                        email:{$regex:search,$options: 'i'}
                    }
                ]
            }).skip(perPage * page)
            .limit(perPage);
        }else{
            userList = await req.models.user.find().skip(perPage * page)
            .limit(perPage)
        }
        let count  = await req.models.user.find().countDocuments();
        let sessionData = req.session
        if(sessionData.user){

            return res.render('admin/users', {
                error: false,
                message: "Successfully login!",
                data: {
                    userList:userList,
                    totalRecords: count,
                    recordsPerPage:perPage
                }
            });

        }else{
            return res.render('admin/index', {
                title: 'Login Page',
                error: false,
                message: ""
                // data: finalCountryData,
                // errorMessage:"",
                // domainUrl : "https://" ,
                // ampUrl: ampUrl,
                // searchQuery: searchQuery
            });
        }
    },
    getUsersLessionsFeedback: async(req,res) =>{
        let search = req.query.search;
        let common = require('../../common');
        let userList;
        let perPage = common.constants.RECORDS_PER_PAGE
        let currentPage = req.query.page || 0
        let user_id = req.params.userId || 0
        let page = Math.max(0, currentPage)
        // console.log(page,currentPage)
        // console.log("user",req.session.user)
        let mongoose = require("mongoose");
        let data = []
        if(search){
              let data = await req.models.userLessons.aggregate([
                    {$match:{userId: mongoose.Types.ObjectId(user_id), isFeedBack:true}},
                    {
                        "$lookup": {
                            "from": "lessons",
                            "localField": "lessonId",
                            "foreignField": "_id",
                            "as": "lession"
                        }
                    },            
                    {$project:{
                            feedBack:1, isCompleted:1, isEnabled:1,isFeedBack:1,"lession":1
                    }},
                   // {skip:perPage * page, limit:perPage}
                ])
        }else{
           // userList = await req.models.user.find().skip(perPage * page)
            //.limit(perPage)
             data = await req.models.userLessons.aggregate([
                    {$match:{userId: mongoose.Types.ObjectId(user_id)}},
                   {
                        "$lookup": {
                            "from": "lessons",
                            "localField": "lessonId",
                            "foreignField": "_id",
                            "as": "lession"
                        }
                    },            
                    {$project:{
                            feedBack:1, isCompleted:1, isEnabled:1,isFeedBack:1,"lession":1
                    }},
                  //  {skip:perPage * page, limit:perPage}
                ])
        }
             
        //let count  = await req.models.user.find().countDocuments();
        data = JSON.parse(JSON.stringify(data));
        let sessionData = req.session
        if(sessionData.user){

            return res.render('admin/userLessionFeedback', {
                error: false,
                message: "Successfully login!",
                data: {
                    userList:data,
                    totalRecords: 10,
                    recordsPerPage:perPage
                }
            });

        }else{
            return res.render('admin/index', {
                title: 'Login Page',
                error: false,
                message: ""
                // data: finalCountryData,
                // errorMessage:"",
                // domainUrl : "https://" ,
                // ampUrl: ampUrl,
                // searchQuery: searchQuery
            });
        }
    },
    getQuestions: async(req,res) =>{
        let _ = require("lodash");
        const common = require('../../common')
        let perPage = common.constants.RECORDS_PER_PAGE
        let page = Math.max(0, req.query.page)
        let questions = await req.models.questions.find({
            isDeleted:false
        });
        let questionData = []
        questions.map(questionsData =>{
            questionData.push({_id:questionsData._id ,question: questionsData.question})
        });
        questionData = _.uniqBy(questionData,"question")
        if(req.session.user){
            return res.render('admin/questions', {
                error: false,
                message: "",
                data: {
                    questions: questionData,
                    totalRecords: questionData.length,
                    recordsPerPage:perPage
                }
            });
        }else{
            return res.render('admin/index', {
                title: 'Login Page',
                error: false,
                message: ""
            });
        }
            
    },
    getQuestionnaireById: async(req,res) => {
        let sessionData = req.session
        let id = req.params.id;
        const mongoose = require("mongoose")
        let questionDetails = await req.models.questions.aggregate([
            
            {$lookup:{ from:'questionoptions',localField:'_id',foreignField:'questionId',as:'questionOptions'}},
            {
                $match:{
                    _id: mongoose.Types.ObjectId(id)
                }
            }
        ]);
        questionDetails.map(data => {
            delete data.__v
            data.questionOptions.map(questionOptionData => {
                delete questionOptionData.__v
            })
        })
        if(req.session.user){
            res.status(200).send({
                data:questionDetails
            })
        }else{
            return res.render('admin/index', {
                title: 'Login Page',
                error: false,
                message: ""
                // data: finalCountryData,
                // errorMessage:"",
                // domainUrl : "https://" ,
                // ampUrl: ampUrl,
                // searchQuery: searchQuery
            });
        }
        
    },
    resetPasswordToken: async(req,res) =>{
        res.render('admin/forgetPassword', {
            error: false,
            message: "Enter password",
            data:req.params.token
        });
    },
    disableUser: async(req,res)=>{
        try{
            if(req.session.user){
                const mongoose = require("mongoose");
                let userId = req.params.userId;
                let status = 0;
                let userDetails = await req.models.user.findOne({_id: mongoose.Types.ObjectId(userId)});
                if(userDetails){
                    try{
                        if(userDetails.isDeleted){
                            await req.models.user.updateOne({_id:mongoose.Types.ObjectId(userId)},{isDeleted:false});
                            status = 0;
                        }else{
                            await req.models.user.updateOne({_id:mongoose.Types.ObjectId(userId)},{isDeleted:true});
                            status = 1;
                        }
                        
                    }catch(err){
                        console.log(err)
                    }
                    
                    res.status(200).send({
                        status:true,
                        code:200,
                        data:{
                            status:status
                        },
                        message:"Successfully updated"
                    })
                }else{
                    res.status(409).send({
                        status:false,
                        code:409,
                        message:"User does not exists",
                        error: err
                    })
                }
            }else{
                return res.render('admin/index', {
                    title: 'Login Page',
                    error: false,
                    message: ""
                    // data: finalCountryData,
                    // errorMessage:"",
                    // domainUrl : "https://" ,
                    // ampUrl: ampUrl,
                    // searchQuery: searchQuery
                });
            }
            
        }catch(error){
            console.log(err)
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong",
                error: err
            })
        }
        
    },
    deleteUser: async(req,res) =>{
        try{
            if(req.session.user){
                let mongoose = require("mongoose")
                let userId = req.params.userId;
                let deletUserDetails = await req.models.user.deleteOne({_id:mongoose.Types.ObjectId(userId)});
                let cannotDeleteCount = 0
                if(deletUserDetails){
                    let deleteUserAnswer = await req.models.answers.deleteMany({userId:mongoose.Types.ObjectId(userId)});
                    if(deleteUserAnswer){
                        let deleteUserLessons = await req.models.userLessons.deleteMany({userId:mongoose.Types.ObjectId(userId)});
                        if(deleteUserLessons){
                            let deleteUserHomework = await req.models.userHomework.deleteMany({userId:mongoose.Types.ObjectId(userId)});
                            if(deleteUserHomework){
                                let deleteUserImages = await req.models.userImages.deleteMany({userId:mongoose.Types.ObjectId(userId)});
                                if(deleteUserImages){
                                   let deleteUserDevices =  await req.models.device.deleteMany({userId:mongoose.Types.ObjectId(userId)});
                                   if(deleteUserDevices){
                                        let deleteUserRecordings =  await req.models.userRecordings.deleteMany({userId:mongoose.Types.ObjectId(userId)});
                                        if(deleteUserRecordings){
                                            let deleteUserReminders =  await req.models.reminder.deleteMany({userId:mongoose.Types.ObjectId(userId)});
                                        }else{
                                            cannotDeleteCount++;
                                        }
                                   }else{
                                        cannotDeleteCount++;
                                   }
                                }else{
                                    cannotDeleteCount++;
                                }
                            }else{
                                cannotDeleteCount++;
                            }
                        }else{
                            cannotDeleteCount++;
                        }
                    }else{
                        cannotDeleteCount++;
                    }
                }else{
                    cannotDeleteCount++;
                }
                if(cannotDeleteCount > 0){
                    res.status(400).send({
                        status:false,
                        code:400,
                        message:"Cannot delete User"
                    })
                }else{
                    res.status(200).send({
                        status:true,
                        code:200,
                        message:"Successfully deleted user"
                    })
                }
            }else{
                return res.render('admin/index', {
                    title: 'Login Page',
                    error: false,
                    message: ""
                    // data: finalCountryData,
                    // errorMessage:"",
                    // domainUrl : "https://" ,
                    // ampUrl: ampUrl,
                    // searchQuery: searchQuery
                });
            }
        }catch(err){
            console.log(err)
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong",
                error: err
            })
        }

    },
    disableQuestions: async(req,res) =>{
        try{
            if(req.session.user){
                let mongoose = require("mongoose")
                let questionId = req.params.questionId;
                let findQuestion = await req.models.questions.findOne({_id:mongoose.Types.ObjectId(questionId)});
                let status = 0;
                if(findQuestion){
                    if(findQuestion.isDeleted){
                        await req.models.questions.updateOne({_id:mongoose.Types.ObjectId(questionId)},{isDeleted:false});
                        status = 0;
                    }else{
                        await req.models.questions.updateOne({_id:mongoose.Types.ObjectId(questionId)},{isDeleted:true});
                        status = 1;
                    }
                    res.status(200).send({
                        status:true,
                        code:200,
                        message:"Successfully updated",
                        data:{
                            status:status
                        }
                    })
                }else{
                    res.status(401).send({
                        status:false,
                        code:401,
                        message:"Question Does not exists"
                    })
                }
            }else{
                return res.render('admin/index', {
                    title: 'Login Page',
                    error: false,
                    message: ""
                    // data: finalCountryData,
                    // errorMessage:"",
                    // domainUrl : "https://" ,
                    // ampUrl: ampUrl,
                    // searchQuery: searchQuery
                });
            }
        }catch(err){
            console.log(err)
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong",
                error: err
            })
        }

    },
    disableQuestionOptions: async(req, res) =>{
        try{
            if(req.session.user){
                let questionOptionId = req.params.questionOptionId;
                const mongoose = require("mongoose");
                let findQuestionOption = await req.models.questionOptions.findOne({_id:mongoose.Types.ObjectId(questionOptionId)})
                if(findQuestionOption){
                    let findAnswerQuestionOption = await req.models.answers.find({questionOptionId:mongoose.Types.ObjectId(questionOptionId)});
                    if(findAnswerQuestionOption.length){
                        await req.models.questionOptions.updateOne({_id:mongoose.Types.ObjectId(questionOptionId)},{isDeleted:true})
                    }else{
                        await req.models.questionOptions.deleteOne({_id:mongoose.Types.ObjectId(questionOptionId)})
                    }
                    res.status(200).send({
                        status:true,
                        code:200,
                        message:"Successfully deleted"
                    })
                }else{
                    res.status(401).send({
                        status:true,
                        code:401,
                        message:"Question option not found"
                    })
                }
            }else{
                return res.render('admin/index', {
                    title: 'Login Page',
                    error: false,
                    message: ""
                    // data: finalCountryData,
                    // errorMessage:"",
                    // domainUrl : "https://" ,
                    // ampUrl: ampUrl,
                    // searchQuery: searchQuery
                });
            }

        }catch(err){
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong"
            })
        }

    },
    dashboard: async(req,res) =>{
        try{
            //if(req.session.user){
                const mongoose = require("mongoose");
                let userActivate = await req.models.user.find({isDeleted:false}).countDocuments();
                let deactivateUser = await req.models.user.find({isDeleted:true}).countDocuments();
                let totalUser = await req.models.user.find().countDocuments();
                let totalLessons = await req.models.lessons.find().countDocuments();
                let totalRecordingTasks = await req.models.recordings.find().countDocuments();


                return res.render('admin/dashboard', {
                    code:200,
                    error: false,
                    message: "Dashboard!",
                    data:{
                        activeUser: userActivate,
                        deactivateUser: deactivateUser,
                        totalUser: totalUser,
                        totalLessons: totalLessons,
                        totalRecordingTasks:totalRecordingTasks
                    }
                });
                // res.status(200).send({
                //     status:true,
                //     code:200,
                //     data:{
                //         activeUser: userActivate,
                //         deactivateUser: deactivateUser,
                //         totalUser: totalUser,
                //         totalLessons: totalLessons,
                //         totalRecordingTasks:totalRecordingTasks
                //     }
                // })
            // }else{
            //     return res.render('admin/index', {
            //         title: 'Login Page',
            //         error: false,
            //         message: ""
            //         // data: finalCountryData,
            //         // errorMessage:"",
            //         // domainUrl : "https://" ,
            //         // ampUrl: ampUrl,
            //         // searchQuery: searchQuery
            //     });
            // }
            
        }catch(error){
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong",
                error:error
            })
        }
    },
    deleteQuestions: async(req,res) =>{
        try{
            let mongoose = require("mongoose");
            let questionId = req.params.questionId;
            let findQuestions = await req.models.questions.findOne({_id:mongoose.Types.ObjectId(questionId)});
            if(findQuestions != null){
                let findAnswerExists = await req.models.answers.findOne({questionId:mongoose.Types.ObjectId(questionId)});
                if(findAnswerExists){
                    await req.models.questions.updateOne({_id:mongoose.Types.ObjectId(questionId)},{isDeleted:1})
                }else{
                    let isQuestionDeleted = await req.models.questions.deleteOne({_id:mongoose.Types.ObjectId(questionId)});
                    if(isQuestionDeleted){
                        await req.models.questionOptions.deleteMany({questionId:mongoose.Types.ObjectId(questionId)})
                    }
                }
                res.status(200).send({
                    status:true,
                    code:200,
                    message:"Question deleted"
                })
            }else{
                res.status(401).send({
                    status:false,
                    code:401,
                    message:"no question found"
                })
            }
        }catch(err){
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong"
            })
        }

    },
    changePassword : async(req,res) =>{
        try {
            let common = require('../../common');
			var mongoose = require('mongoose');
			var bcrypt = require('bcryptjs');
            let sessionData = req.session

            // if(sessionData.user){
                var userData = sessionData.user
                var user_id = userData._id
                // let adminData = await req.models.siteAdmin.aggregate([
                //     {$match:{_id:mongoose.Types.ObjectId(user_id)}}
                // ]);

                let comparePassword = await bcrypt.compare(req.body.oldPassword,userData.password);
                console.log(comparePassword)
                if(comparePassword){
                    let hash = bcrypt.hashSync(req.body.newPassword,10);
                    var result = await req.models.siteAdmin.findByIdAndUpdate(mongoose.Types.ObjectId(user_id), {password:hash})
                    console.log(result)
                    res.status(200).send({
                        status:true,
                        code:200,
                        message:"Password changed successfully"
                    })
                }else{
                    res.status(403).send({
                        status:false,
                        code:403,
                        message:"Incorrect Password"
                    })
                }
        //     }else{
        //         return res.render('admin/index', {
        //             title: 'Login Page',
        //             error: false,
        //             message: ""
        //             // data: finalCountryData,
        //             // errorMessage:"",
        //             // domainUrl : "https://" ,
        //             // ampUrl: ampUrl,
        //             // searchQuery: searchQuery
        //         });
        // }
        } catch (error) {
			console.log(error)
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong"
            })
        }
    },
    listsInfo: async(req,res) =>{
        try{
            //if(req.session.user){
                const mongoose = require("mongoose");
                let userActivate = await req.models.user.find({isDeleted:false}).countDocuments();
                let deactivateUser = await req.models.user.find({isDeleted:true}).countDocuments();
                let totalUser = await req.models.user.find().countDocuments();
                let totalLessons = await req.models.lessons.find().countDocuments();
                let totalRecordingTasks = await req.models.recordings.find().countDocuments();

                res.status(200).send({
                    status:true,
                    code:200,
                    data:{
                        activeUser: userActivate,
                        deactivateUser: deactivateUser,
                        totalUser: totalUser,
                        totalLessons: totalLessons,
                        totalRecordingTasks:totalRecordingTasks
                    }
                })
        }catch(error){
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong",
                error:error
            })
        }
    },
    getAllGenders : async(req,res)=>{
        try{
            //if(req.session.user){
                const mongoose = require("mongoose");
                const helper = require('../../helpers/common-helper')

                let gender = await helper.getAllGenders(req)

                res.status(200).send({
                    status:true,
                    code:200,
                    data:gender
                })
        }catch(error){
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong",
                error:error
            })
        }
    },

    saveGenderFrequency : async(req , res)=>{
        try {
            const mongoose = require("mongoose");
            const helper = require('../../helpers/common-helper')

            let rowId               = req.body.rowId
            let gender              = req.body.gender
            let idealMinFrequency   = req.body.idealMinFrequency
            let idealMaxFrequency   = req.body.idealMaxFrequency

            if(rowId){
                let data = {
                    idealMinFrequency   : idealMinFrequency,
                    idealMaxFrequency   :idealMaxFrequency,
                }
                let updateRow = await req.models.genderFrequency.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(rowId) }, data)

                res.status(200).send({
                    status: true,
                    code: 200,
                    message: "Gender frequency successfully updated"
                })
            }else{
                let data = {
                    gender              : gender,
                    idealMinFrequency   : idealMinFrequency,
                    idealMaxFrequency   : idealMaxFrequency,
                }
                let checkgenderFrequencySchema = new req.models.genderFrequency(data)
                let result = await checkgenderFrequencySchema.save()

                res.status(200).send({
                    status: true,
                    code: 200,
                    message: "Gender frequency successfully saved",
                    data : result
                })
            }
        } catch (error) {
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong",
                error:error
            })
        }
    },

    getAllGenderIdealFrequencies : async(req, res)=>{
        try{
            //if(req.session.user){
                const mongoose = require("mongoose");
                const helper = require('../../helpers/common-helper')

                let getAllGenderFrequency = await helper.getAllGenderFrequency(req)

                res.status(200).send({
                    status:true,
                    code:200,
                    data:getAllGenderFrequency
                })
        }catch(error){
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong",
                error:error
            })
        }
    }
}

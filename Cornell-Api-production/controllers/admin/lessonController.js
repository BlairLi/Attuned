module.exports = {
  saveLessons: async (req, res) => {
    let common = require('../../common');
    let helper = require('../../helpers/common-helper');
    const mongoose = require('mongoose')
    try {
      if (req.session.user) {
        const common = require("../../common")
        let name = req.body.lessonName;
        let id = req.body.id
        let lessonContent = req.body.lessonContent;
        let homeWorktotalTime = req.body.homeWorktotalTime;
        let totalTime = req.body.totalTime
        let sortOrder = req.body.sortOrder
        // lessonContent.map((data)=>{
        //     console.log(data.duration)
        //     totalTime +=data.duration
        // });
        let data = {
          name: name,
          lessonDetails: lessonContent,
          homeWorktotalTime: homeWorktotalTime,
          totalTime: totalTime,
          sortOrder: sortOrder
        }
        if (id == null) {
          //console.log(data)
          let addLessons = new req.models.lessons(data);
          await addLessons.save();
          let helperData = {
            APIName: "Save Lessons",
            request: JSON.stringify(req.body),
            response: JSON.stringify({
              code: common.http_status.HTTP_SUCCESS,
              status: true,
              message: "Successfully added",
              data: {
                lessonId: addLessons._id
              }
            })
          }
          helper.saveLogs(req, helperData)
          res.status(common.http_status.HTTP_SUCCESS).send({
            code: common.http_status.HTTP_SUCCESS,
            status: true,
            message: "Successfully added",
            data: {
              lessonId: addLessons._id
            }
          })

        } else {
          //console.log("**********************",id,data)
          //let updateLesson = await req.models.lessons.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(id) }, data)
          let filter = {
            _id : mongoose.Types.ObjectId(id)
          }
          let updateLesson = await req.models.lessons.findOneAndUpdate(filter, data, {
            new: true,
            rawResult: true
          });
          console.log(updateLesson)
          let helperData = {
            APIName: "Save Lessons",
            request: JSON.stringify(req.body),
            response: JSON.stringify({
              code: common.http_status.HTTP_SUCCESS,
              status: true,
              message: "Successfully updated",
              data: {
                lessonId: id
              }
            })
          }
          helper.saveLogs(req, helperData)
          //console.log("check 1")
          res.status(common.http_status.HTTP_SUCCESS).send({
            code: common.http_status.HTTP_SUCCESS,
            status: true,
            message: "Successfully updated",
            data: {
              lessonId: id
            }
          })
          //console.log("check 2")
        }

      } else {
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

    } catch (err) {
      console.log(err)
      let helperData = {
        APIName: "Save Lessons",
        request: JSON.stringify(req.body),
        response: JSON.stringify({
          code: common.http_status.INTERNAL_SERVER_ERROR,
          status: false,
          message: common.message.INTERNAL_SERVER_ERROR
        })
      }
      helper.saveLogs(req, helperData)
      res.status(common.http_status.HTTP_SUCCESS).json({
        code: common.http_status.INTERNAL_SERVER_ERROR,
        status: false,
        message: common.message.INTERNAL_SERVER_ERROR
      })
    }
  },
  saveHomework: async (req, res) => {
    try {
      // if(req.session.user){
      const mongoose = require("mongoose")
      let helper = require('../../helpers/common-helper');
      let _ = require("lodash");
      let arr = [];
      let arr2 = [];
      let homeworks = req.body.homework;
      let name = req.body.homeworkName;
      let id = req.body.id;
      let lessonId = req.params.lessonId;
      let exerciseId = req.params.exerciseId;
      //let homeworkDetail = req.body.homeworkDetail;
      let totalTime = 0;
      // console.log(homeworks)
      homeworks.map(homeworkData => {
        homeworkData.lessonId = lessonId;
        // homeworkData.homeworkDetail.map(data =>{
        //     totalTime += data.duration
        // })
        // homeworkData.totalTime =totalTime
      });

      let findLesson = await req.models.lessons.findOne({ _id: mongoose.Types.ObjectId(lessonId) })
      let findHomework2 = await req.models.homework.find({ lessonId: mongoose.Types.ObjectId(lessonId) })
      let findHomework = await req.models.homework.aggregate([
          {
            $match:{ lessonId: mongoose.Types.ObjectId(lessonId) }
          }
        ])

      //to find all present homework ids
      findHomework.map(ele=>{
        //console.log(typeof(ele._id))
        arr2.push(mongoose.Types.ObjectId(ele._id))
      }) 
      homeworks.map(ele=>{
        arr.push(mongoose.Types.ObjectId(ele._id))
      })

      let diff = _.differenceWith(arr2, arr, _.isEqual);

      //delete removed homeworks
      diff.map(async(ele)=>{
        //console.log(ele)
        await req.models.homework.deleteOne({_id:mongoose.Types.ObjectId(ele)})
      })

      let insertHomework;
      let homeWorktotalTime = req.body.homeWorktotalTime;
      if (findLesson != null) {

        for (var i = 0; i < homeworks.length; i++) {
          if (homeworks[i]._id == null) {
            //console.log(homeworks[i].name)
            insertHomework = new req.models.homework(homeworks[i])
            await insertHomework.save()
          } else {
            await req.models.homework.findByIdAndUpdate(homeworks[i]._id, { name: homeworks[i].name, homeworkDetail: homeworks[i].homeworkDetail, lessonId: lessonId,totalTime:homeworks[i].totalTime });
          }

        }
        await req.models.lessons.findByIdAndUpdate(lessonId, { homeWorktotalTime: homeWorktotalTime })

        //console.log(arr,arr2,diff)
        res.status(200).send({
          status: true,
          code: 200,
          message: "Successfully inserted",
          data: homeworks
        })
        let helperData = {
          APIName : "saveHomework",
          request: JSON.stringify(req.body),
          response : JSON.stringify({ 
              status: true,
              code: 200,
              message: "Successfully inserted",
              data : {lessonId : lessonId}
          })
      }
      helper.saveLogs(req,helperData)

      } else {
        res.status(409).send({
          status: false,
          code: 409,
          message: "No lesson found"
        })
      }



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

    } catch (err) {
      console.log(err);
      res.status(500).send({
        status: false,
        code: 500,
        data: err
      })
    }
  },
  uploadFile: async (req, res) => {
    const { getVideoDurationInSeconds } = require('get-video-duration')
    const common = require('../../common');
    const helper = require('../../helpers/common-helper')
    try {
      let commonHelper = require("../../helpers/common-helper");
      let data = await commonHelper.uploadFile(req, res, ['.mp4'])
      //console.log("upload data",data)
      let durationData = await getVideoDurationInSeconds(data.url)
      //console.log(durationData)
      data.duration = durationData
      console.log("======================", data)

      return res.status(common.http_status.HTTP_SUCCESS).json({
        status: true,
        code: common.http_status.HTTP_SUCCESS,
        message: "Successfully Uploaded",
        data: data
        //data: { name: orignal_name, url: (process.env.BUCKET_ACCESS_URL + "common/" + orignal_name) }
      });
    } catch (err) {
      res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
        status: common.http_status.ERROR,
        code: common.http_status.INTERNAL_SERVER_ERROR,
        message: err
        //message:common.message.INTERNAL_SERVER_ERROR
      })
    }

  },
  lessonList: async (req, res) => {
    const common = require('../../common');
    const helper = require('../../helpers/common-helper')
    try {
      if (req.session.user) {
        let perPage = common.constants.RECORDS_PER_PAGE
        let page = Math.max(0, req.query.page)
        let lessonList = await req.models.lessons.find().sort({ 'sortOrder': 1 }).skip(perPage * page)
          .limit(perPage);
        helper.saveLogs(req, {
          APIName: 'Lesson List',
          request: JSON.stringify({ page: page }),
          response: JSON.stringify({
            error: false,
            message: "Lesson List",
            data: {
              lesson: lessonList,
              totalRecords: lessonList.length,
              recordsPerPage: perPage
            }
          })
        })
        return res.render(
          'admin/lessons',
          {
            error: false,
            message: "Lesson List",
            data: {
              lesson: lessonList,
              totalRecords: lessonList.length,
              recordsPerPage: perPage
            }
          });
      } else {
        res.render('admin/index', {
          error: true,
          message: "Un-authorized acces!"
        });
      }
    } catch (err) {
      res.status(500).send({
        status: false,
        code: 500,
        data: err
      })
    }

  },
  getLessonDetails: async (req, res) => {
    if (req.session.user) {
      try {

        let mongoose = require("mongoose")
        let lessonId = JSON.parse(JSON.stringify(req.params.id));
        let lessonDetail = []
        let lessonContent = await req.models.lessons.aggregate([
          {
            $lookup: {
              from: "homeworks",
              localField: '_id',
              foreignField: 'lessonId',
              as: 'homework'
            }
          }
        ])
        if (lessonContent) {
          lessonContent.map(data => {
            if (data._id == lessonId) {
              delete data.__v

              lessonDetail.push(data)
            }
          })
          // Temporary fix for old data
          // lessonDetail[0].homework.map(ele1=>{
          //   ele1.homeworkDetail.map(ele2=>{
          //     if(ele2.contentType=="video" && ele2.contentType.duration== undefined){
          //       ele2.duration = 33.356
          //     }
          //   })
          // })
          res.status(200).send({
            status: true,
            code: 200,
            data: {
              lessonData: lessonDetail
            },
            message: "data found"
          })
        } else {
          res.status(200).send({
            status: true,
            code: 200,
            data: {},
            message: "No data found"
          })
        }

      } catch (error) {
        res.status(500).send({
          status: false,
          code: 500,
          data: error
        })
      }

    } else {
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
  getUserDetailsById: async (req, res) => {
    try {
      console.log(req.session.user)
      // if(req.session.user){
      const mongoose = require("mongoose");
      const _ = require("lodash");
      let userId = req.params.userId;
      let lessons = []
      let homework = []
      let questionsAnswers = []
      let lessonDetail = await req.models.lessons.aggregate([
        {
          $lookup: {
            from: 'userlessons',
            localField: '_id',
            foreignField: 'lessonId',
            as: 'userlessons'
          }
        },
        {
          $sort: {
            'sortOrder': -1
          }
        }
      ])
      let answerDetail = await req.models.questions.aggregate([
        { $sort: { questionOrder: 1 } },
        {
          $lookup: {
            from: 'answers',
            localField: '_id',
            foreignField: 'questionId',
            as: 'answer'
          }
        }

      ]);
      answerDetail.map(answerData => {
        answerData.answer.map(userData => {
          if (userId == userData.userId) {
            questionsAnswers.push({
              questionId: userData.questionId,
              question: answerData.question,
              answerOption: userData.questionOptionId,
              otherAnswer: userData.otherAnswer,
              answer: ""
            })
          }
        })
      });
      // questionsAnswers = _.uniqBy(questionsAnswers,'question');
      let questionOptions;
      for (var i = 0; i < questionsAnswers.length; i++) {
        if (questionsAnswers[i].otherAnswer == undefined || questionsAnswers[i].otherAnswer == null) {
          questionOptions = await req.models.questionOptions.findOne({ _id: mongoose.Types.ObjectId(questionsAnswers[i].answerOption) });
          questionsAnswers[i].answer = questionOptions.value
        } else {

          // console.log("here")
          questionsAnswers[i].answer = questionsAnswers[i].otherAnswer
        }
      }
      questionsAnswers.map(finalQuestionData => {
        delete finalQuestionData.questionId
        delete finalQuestionData.answerOption
        delete finalQuestionData.otherAnswer
      });
      questionsAnswers = _.groupBy(questionsAnswers, 'question');
      let userHomeworkData;
      let homeworkId;
      let finalLessonArray = []
      let finalLessonObject = {}
      for (let i = 0; i < lessonDetail.length; i++) {
        if (lessonDetail[i].userlessons.length > 0) {
          for (let j = 0; j < lessonDetail[i].userlessons.length; j++) {
            if (lessonDetail[i].userlessons[j].userId == req.params.userId) {
              if (lessonDetail[i].userlessons[j].isFeedBack) {
                finalLessonArray.push({
                  lessonId: lessonDetail[i]._id,
                  lessonName: lessonDetail[i].name
                })
              }
            }
          }
        } else {
          finalLessonObject['lessonId'] = ''
          finalLessonObject['lessonName'] = 'N/A'
        }


      }
      if (finalLessonArray.length > 0) {
        finalLessonObject = {
          lessonId: finalLessonArray[0].lessonId,
          lessonName: finalLessonArray[0].lessonName
        }
      } else {
        finalLessonObject = {
          lessonId: '',
          lessonName: 'N/A'
        }
      }

      // console.log(finalLessonObject)
      let homeworks = await req.models.homework.aggregate([
        {
          $match: {
            'lessonId': finalLessonObject.lessonId
          }
        },
        {
          $sort: {
            'sortOrder': -1
          }
        }
      ])
      // console.log(homeworks)
      let userhomeworkdata = '';
      for (let i = 0; i < homeworks.length; i++) {
        // if(homeworks[i].userhomeworks.length > 0){

        // userHomeworkdata = await req.models.userHomework.find({lessonId:mongoose.Types.ObjectId(homeworks[i].lessonId)})
        // console.log(homeworks[i]._id)

        userhomeworkdata = await req.models.userHomework.find({ exerciseId: mongoose.Types.ObjectId(homeworks[i]._id) })
        for (let j = 0; j < userhomeworkdata.length; j++) {
          if (userhomeworkdata[j].userId == req.params.userId) {
            if (new String(homeworks[i]._id).valueOf() == new String(userhomeworkdata[j].exerciseId).valueOf()) {
              // console.log(homeworks[i].name,userhomeworkdata[j].isFeedBack,finalLessonObject.lessonName)
              if (userhomeworkdata[j].isFeedBack == true) {
                finalLessonObject['homework'] = {
                  name: homeworks[i].name
                }
              }
            }
          }
        }
        // for(let j = 0;j<homeworks[i].userhomeworks;j++){
        //     console.log(homeworks[i].userhomeworks[j].isFeedBack)
        //     if(homeworks[i].userhomeworks[j].userId == req.params.userId){
        //         if(homeworks[i].userhomeworks[j].isFeedBack){
        //             finalLessonObject['homework'] = {
        //                 name:homeworks[i].name
        //             }
        //         }
        //     }
        // }


        // }else{
        //     finalLessonObject['homework'] = {
        //         name:"N/A"
        //     }
        // }

      }
      let answerArray = Object.values(questionsAnswers)
      let finalAnswer = [];
      answerArray.map(data => {
        data.map(insideData => {
          delete insideData.question
        })
      })

      let userDetails = await req.models.user.aggregate([
        {
          $lookup: {
            from: 'userimages',
            localField: '_id',
            foreignField: 'userId',
            as: 'userImages'
          }
        }
      ])
      // console.log(userDetails)
      let userFinaldata = []
      userDetails.map(userData => {
        if (userData._id == userId)
          if (userData.userImages.length > 0) {
            userFinaldata.push({
              name: userData.name,
              email: userData.email,
              isDeleted: userData.isDeleted || false,
              userImage: process.env.BUCKET_ACCESS_URL + 'common/' + userData.userImages[0].images
            })
          } else {
            userFinaldata.push({
              name: userData.name,
              email: userData.email,
              userImage: ""
            })
          }

      })
      let finalData = {
        questionAnswerData: questionsAnswers,
        lessonData: finalLessonObject,
        userDetails: userFinaldata
      }
      res.status(200).send({
        status: true,
        code: 200,
        message: "details",
        data: finalData
      })
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
    } catch (err) {
      console.log(err)
      res.status(500).send({
        status: false,
        code: 500,
        message: "Something went wrong",
        error: err
      })
    }
  },
  homeworkList: async (req, res) => {
    try {
      if (req.session.user) {
        let lessonId = req.params.lessonId;
        const mongoose = require("mongoose")
        const common = require('../../common');
        let search = req.body.search;
        let perPage = common.constants.RECORDS_PER_PAGE
        let page = Math.max(0, req.query.page)
        let homeworkList;
        if (search) {
          homeworkList = await req.models.homework.find({
            lessonId: mongoose.Types.ObjectId(lessonId),
            name: { $regex: search, $options: 'i' }
          }).skip(perPage * page)
            .limit(perPage);
        } else {
          homeworkList = await req.models.homework.find({
            lessonId: mongoose.Types.ObjectId(lessonId)
          }).skip(perPage * page)
            .limit(perPage);
        }
        let count = await req.models.homework.find({ lessonId: mongoose.Types.ObjectId(lessonId) }).countDocuments();
        console.log(count)
        res.status(200).send({
          status: false,
          code: 200,
          message: "list",
          data: {
            homeworkList: homeworkList,
            totalRecords: count,
            recordsPerPage: perPage
          }
        })
      } else {
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

    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: "Something went wrong",
        error: error
      })
    }


  },
  disableLessons: async (req, res) => {
    try {
      if (req.session.user) {
        const mongoose = require('mongoose');
        let lessonId = req.params.lessonId;
        let findLessons = await req.models.lessons.findOne({ _id: mongoose.Types.ObjectId(lessonId) });
        if (findLessons) {
          let findUserLessons = await req.models.userLessons.find({ lessonId: mongoose.Types.ObjectId(lessonId) });
          console.log(findUserLessons.length);
          if (findUserLessons.length) {
            await req.models.lessons.updateOne({ _id: mongoose.Types.ObjectId(lessonId) }, { isDeleted: true })
          } else {
            await req.models.lessons.deleteOne({ _id: mongoose.Types.ObjectId(lessonId) })
          }
          res.status(200).send({
            status: false,
            code: 200,
            message: "Lessons successfully deleted"
          })
        } else {
          res.status(401).send({
            status: false,
            code: 401,
            message: "Lessons not found"
          })
        }
      } else {
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
    } catch (error) {
      res.status(500).send({
        status: false,
        code: 500,
        message: "Something went wrong"
      })
    }


  }
}
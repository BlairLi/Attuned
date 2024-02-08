module.exports = {
    forgotPassword: async(req, res) => {
        try {
            var helper = require('../helpers/common-helper')
            const _ = require('lodash');
            const bcrypt = require('bcryptjs');
            const crypto = require("crypto")
            const moment = require("moment")
            var common = require('../common')

            const User = req.models.user 
            let email = req.body.email;
            let userInfo = await User.findOne({email:email})
          if (userInfo != null) {
            try {
              let token = email + userInfo.id;
              let resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
              let resetPasswordExpires = Math.round(((new Date()).getTime()/1000));//epoch in seconds

              await User.findByIdAndUpdate(userInfo.id,{ resetPasswordToken: resetPasswordToken, resetPasswordExpires: resetPasswordExpires }, {upsert: true, new: true})
              

                //let resetLink = req.BASE_URL + "resetPassword" + "/" + resetPasswordToken;
              let resetLink = "https://cornellapp.mobikasa.net/admin/reset-password/" + resetPasswordToken;
              let name = userInfo.name;
              let template ='forgotPassword.html';
              let from_id = "apptestmobikasa@gmail.com",
                to_id = email,
                subject = 'Password Reset',
                template_name = template,
                replacements = { user: name, resetLink: resetLink, date: moment(new Date()).format("MMMM Do YYYY") };
              helper.sendEmail(from_id, to_id, subject, template_name, replacements);
              // res.status(common.http_status.HTTP_SUCCESS).send({
              //   status: common.http_status.SUCCESS,
              //   message: common.message.FORGOT_PASSWORD.SUCCESS
              // })
              res.status(common.http_status.HTTP_BAD_REQUEST).json({ status: common.http_status.ERROR, code: common.http_status.HTTP_SUCCESS, message: common.message.FORGOT_PASSWORD.SUCCESS });
            } catch (err) {
              console.log(err)
              res.status(common.http_status.INTERNAL_SERVER_ERROR).send({
                  status: common.http_status.INTERNAL_SERVER_ERROR,
                  message: common.message.INTERNAL_SERVER_ERROR
              })
            }
          } else {
            // res.status(common.http_status.HTTP_BAD_REQUEST).send({
            //     status: common.http_status.ERROR,
            //     message: common.message.FORGOT_PASSWORD.FAILED
            // })
            res.status(common.http_status.HTTP_BAD_REQUEST).json({ status: common.http_status.ERROR, code: common.http_status.HTTP_BAD_REQUEST, message: common.message.FORGOT_PASSWORD.FAILED });
          }
        } catch (err) {
            console.log(err)
            res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
              code:common.http_status.INTERNAL_SERVER_ERROR,
              status:common.http_status.ERROR,
              message: common.message.INTERNAL_SERVER_ERROR
          })
        }
      },
    resetPassword: async(req, res) => {
      const _ = require('lodash');
      const bcrypt = require('bcryptjs');
      const crypto = require("crypto")
      const moment = require("moment")
      var common = require('../common')
      try {
        let resetToken = req.params.token,
          password = req.body.password,
          userInfo = await req.models.user.findOne({ resetPasswordToken: resetToken });
        if (userInfo != null) {
          let expTime = 86400, // 1 Day in seconds
            expiresIn = userInfo.resetPasswordExpires,
            currTime = Math.round(((new Date()).getTime())/1000),
            timeDiff = currTime - expiresIn;
          if (timeDiff > expTime) {
            return res.status(common.http_status.HTTP_NOT_FOUND).send({
              status: false,
              code: common.http_status.HTTP_NOT_FOUND,
              message: common.message.RESET_PASSWORD.FAILED
            });
          } else {
              
              await req.models.user.findByIdAndUpdate(userInfo.id,{ password: bcrypt.hashSync(password, 10), resetPasswordToken: '', resetPasswordExpires: '' },{upsert: true, new: true} );
              // res.status(common.http_status.HTTP_SUCCESS).send({
              //     status: common.http_status.SUCCESS,
              //     message: common.message.RESET_PASSWORD.SUCCESS
              // })
              return res.render('admin/appResetPassword', {
                status: true,
                error: false,
                message: common.message.RESET_PASSWORD.SUCCESS
            });
          }
        } else {
              res.status(common.http_status.HTTP_UNAUTHORIZED).send({
                  status: false,
                  message: common.message.RESET_PASSWORD.WRONG_LINK
              })
        }
      } catch (err) {
          console.log(err)
          res.status(common.http_status.INTERNAL_SERVER_ERROR).send({
              status: common.http_status.INTERNAL_SERVER_ERROR,
              message: common.message.INTERNAL_SERVER_ERROR
          })
      }
    },
    upload: function(req, res, upload_type_allowed) {
      const common = require('../common');
      const commonHelper = require('../helpers/common-helper')
      let path = require("path");
      let fs = require("fs");
      try {
        console.log("here")
        let file_to_upload = req.files ? req.files.image : '';
        if (file_to_upload) {
          let absolute_path = path.join(__dirname, "../public/temp");
          if (!fs.existsSync(absolute_path)) {
            fs.mkdirSync(absolute_path, { recursive: true })
            fs.chmodSync(absolute_path, '775', function(err) {
              if (err) throw err;
            });
          }
          var extension = file_to_upload.name.split('.').pop();
          if (upload_type_allowed.includes("." + extension)) {
            //var orignal_name = (new Date()).getTime() + "." + extension;
            var orignal_name = (new Date()).getTime() + "." + extension;
            file_to_upload.mv(absolute_path + '/' + orignal_name, async(err) => {
              if (err) {
                return res.status(common.http_status.INTERNAL_SERVER_ERROR).json({ status: false, code: common.http_status.INTERNAL_SERVER_ERROR, message: "Cannot Upload File To Server error - " + err });
              } else {
                  let a = await commonHelper.saveToS3(req, orignal_name);
                  console.log("a",a)
                  return res.status(common.http_status.HTTP_SUCCESS).json({
                    status: true,
                    code: common.http_status.HTTP_SUCCESS,
                    message: "Successfully Uploaded",
                    data: { name: orignal_name, url: (process.env.BUCKET_ACCESS_URL + orignal_name) }
                  });
              }
            });
          } else {
            res.status(common.http_status.HTTP_BAD_REQUEST).json({ status: common.http_status.ERROR, code: common.http_status.HTTP_BAD_REQUEST, message: 'Please upload only these types - ' + upload_type_allowed });
          }
  
        } else {
          res.status(common.http_status.HTTP_BAD_REQUEST).json({ status: common.http_status.ERROR, code: common.http_status.HTTP_BAD_REQUEST, message: 'Please upload an image' });
        }
      } catch (err) {
        return res.status(common.http_status.INTERNAL_SERVER_ERROR).json({ status: false, code: common.http_status.INTERNAL_SERVER_ERROR, message: "Cannot Upload File To Server error - " + err });
      }
    },
    truncateCollection:async(req,res) =>{
      var common = require('../common')
      try {
          userInfo = await req.models.homework.remove({});
          res.status(common.http_status.HTTP_SUCCESS).send({
            status: common.http_status.SUCCESS,
            message: "Collection truncated"
        })
      } catch (err) {
          console.log(err)
          res.status(common.http_status.INTERNAL_SERVER_ERROR).send({
              status: common.http_status.INTERNAL_SERVER_ERROR,
              message: common.message.INTERNAL_SERVER_ERROR
          })
      }
    },

    testAdminNotification : async(req,res)=>{
      var apn = require('apn');
      deviceToken = req.body.deviceToken
        let payload = {
          type: "Admin Notifications",
          title : "Test",
          info: {}
        }
        let note = new apn.Notification({
          alert: "This is a test from admin",
          payload:payload
        });
        
        cert = "./certificates/TransV.pem";
        key = "./certificates/TransV.pem";
        topic = "com.mobikasa.push";
        productionEnv	= true; 
        service = new apn.Provider({
          cert: cert,
          key: key,
          production: productionEnv 
        });
        note.topic = topic
        service.send(note, [deviceToken]).then(result => {


          if (result.sent && result.sent != '') {
            //console.log(result)
            res.send(result)
          } else {
            //console.log(result.failed[0].response)
            res.send(result.failed)

          }
          
        })
    },

    updateDeviceToken : async(req, res)=>{
      try {
        const common = require('../common');
        const commonHelper = require('../helpers/common-helper')
        var user_id = req.decoded.user_id

        await commonHelper.checkDeviceExistance(user_id,req);
        let saveDevice = await commonHelper.saveDeviceData(user_id,req);
        // if (saveDevice.deviceToken){
          res.status(common.http_status.HTTP_SUCCESS).json({ 
              status: common.http_status.SUCCESS, 
              code: common.http_status.HTTP_SUCCESS,
              message: "Device data has been updated",
              data : {}
          });
        // }else{
        //     res.status(common.http_status.HTTP_SUCCESS).json({ 
        //       status: common.http_status.SUCCESS, 
        //       code: common.http_status.HTTP_SUCCESS,
        //       message: "Device data has been updated",
        //       data : {}
        //     });
        // }
      } catch (error) {
         res.status(common.http_status.INTERNAL_SERVER_ERROR).json({
            code:common.http_status.INTERNAL_SERVER_ERROR,
            status:common.http_status.ERROR,
            message: common.message.INTERNAL_SERVER_ERROR
          })
      }
    },

    testTime :async(req, res)=>{
      try {
        const mongoose = require('mongoose');
        const { getVideoDurationInSeconds } = require('get-video-duration')
        // var currdatetime = new Date();
        // //console.log(currdatetime);

        // // var currtime = Date.now();
        // // console.log(currdatetime);
        // var testTime={serverTime : currdatetime}
        // var data = new req.models.testModel(testTime)
        // var savedData =await data.save()
        // console.log(savedData)
        // res.status(200).json({result:savedData})
         var arr = [];
         var arr2 = [];
        // var finalData = {};
        // var homework = await req.models.homework.find({homeworkDetail:{$elemMatch: { contentType: "video" }}});
        // //var data=req.models.lessons
        // console.log()
        // var data = homework.map(ele=>{
        //   let c = 0;
        //   ele.homeworkDetail.map(ele2=>{
        //     //console.log((ele2.hasOwnProperty("duration")),ele._id)
        //     if((ele2.duration==undefined) && (ele2.contentType=="video")){
        //       //console.log(ele._id)
        //       // let doc1 = {}
        //       // let durationData = await getVideoDurationInSeconds(ele2.contentUrl)
        //       // console.log(durationData)
        //       // doc1._id = ele2._id
        //       // doc1._contentUrl = durationData
        //       console.log(ele._id)
        //       arr.push(ele2)
        //       //c=c+1;
        //     }
        //   })
        //   // if(c>0){
        //   //   arr.push(ele._id)
        //   // }
        // })
        // // for(var i =0;i<lesson.length;i++){
        // //   console.log()
        // //   for(var j = 0;j<lesson[i].lessonDetails.length;j++){
        // //       console.log((lesson[i].lessonDetails[j].duration));
        // //   }
        // // }
        // finalData.homework = homework;
        // finalData.data = arr;
        var delData = await req.models.logs.deleteMany({})
        /**========================================================================================================= */
         // Delet lessons and its homewrok post 5
          // var delData2 = await req.models.lessons.find({sortOrder :{$gt: 5}})
          // delData2.map(ele=>{
          //   arr.push(ele._id)
          // })  
          // for(let i =0;i<arr.length;i++){
          //   await req.models.homework.deleteMany({lessonId :mongoose.Types.ObjectId(arr[i])})
          // }

          // var delData3 = await req.models.lessons.deleteMany({sortOrder :{$gt: 5}})

        /**========================================================================================================= */
        res.send(delData)
      } catch (error) {
          console.log(error)
          res.status(500).json({err:error})
      }
    },

    getGender : async(req, res)=>{
      return new Promise(async(resolve,reject)=>{
        try {
          const mongoose = require('mongoose')
          let user_id = req.decoded.user_id;
          let questionId = await req.models.questions.aggregate([
            {
              $match:{questionOrder : 1}
            }
          ])
          
          
          let answers = await req.models.answers.aggregate([
            {
              $match:{userId:mongoose.Types.ObjectId(user_id),questionId:mongoose.Types.ObjectId(questionId[0]._id)}
            }
          ])

          //console.log(answers)
          if(answers[0].questionOptionId == null){
            resolve (answers[0].otherAnswer)
          }else{
            let optionValue = await req.models.questionOptions.aggregate([
              {
                $match:{_id:mongoose.Types.ObjectId(answers[0].questionOptionId)}
              }
            ])
            resolve (optionValue[0].value)
          }
        } catch (error) {
            reject (error)
        }
      })
    }

}


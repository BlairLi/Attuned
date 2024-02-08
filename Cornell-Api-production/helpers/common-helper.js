
let saveToS3 = async(req, uploaded_payload) => {
  const path = require('path');
  const common = require('../common');
  const fs = require('fs');
  const awsHelper = require('../helpers/aws-helper')
  return new Promise(async(resolve, reject) => {
    try {

      let payload_absolute_path = path.join(__dirname, "../", common.constants.temp_base_path, uploaded_payload);
      // console.log(payload_absolute_path)
      if (fs.existsSync(payload_absolute_path)) {
        let fileBuffer = fs.readFileSync(payload_absolute_path);;

        let user_created_timespan = "common";
        await awsHelper.makeFolder(user_created_timespan);
          //console.log("s3 1")
          let uploadResponse = await awsHelper.uploadS3(user_created_timespan, fileBuffer, uploaded_payload);
          resolve(true);
      }else{
        //console.log("s3 2")
        resolve(true);
      }

    } catch (err) {

      reject(err);
      // throw new Error("Image not uploaded" + err);
    }
  })
}

let adminEmailNotification = async(from_id, to_id, subject, template_name, replacements)=>{
  let fs = require("fs");
  let handlebars = require('handlebars');
  let nodemailer = require("nodemailer");
  let path = require("path");

        let template_path = path.join(__dirname, "../", "templates/")
        let html = fs.readFileSync(template_path + template_name, "utf8");
        var template = handlebars.compile(html);
        var htmlToSend = template(replacements);
        try{
          var transporter = nodemailer.createTransport({
            host: process.env.SES_SERVER_NAME,
            port: process.env.SES_PORT,
            secure: process.env.USE_TLS,
            auth: {
              user: process.env.SES_USERNAME,
              pass: process.env.SES_PASSWORD
            }
        });
        let content = {
            from: process.env.SES_EMAIL, // sender address
            to: to_id, 
            subject: subject,
            html: htmlToSend
        }

        
        let info = transporter.sendMail({
            ...content

        }, (err, result) => {
             if (err) console.log("error in send email function",err);
              else console.log(result);
        }); 
        }catch(err){
          console.log(err)
        }
}

module.exports = {
    createAccessToken: async(...args) => {
        const jwt = require('jsonwebtoken')
        let expiresIn = new Date().getTime();
        var secretKey = process.env.SECRET_KEY || 'thisisatemporarysecretkey'
        //console.log({ email: args[0], user_id: args[1],expiresIn: expiresIn })
        //args[1] = req
        let admin = args[2].body.admin
        let access_token = jwt.sign({ email: args[0], user_id: args[1], admin:admin, expiresIn: expiresIn }, secretKey, { expiresIn: '365d' });
        return access_token;
      },
    saveDeviceData:async(id,req)=>{
        const Device = req.models.device
        let deviceData = {
            deviceToken: req.headers.device_token,
            deviceId:req.headers.device_id,
            deviceType: req.headers.device_type,
            appVersion: req.headers.app_version,
            userId:  id
        }

        let deviceInsatnce = new Device(deviceData)
        //save user's device data in database
        let saveDevice = await deviceInsatnce.save();
        //console.log(saveDevice)
        return saveDevice
    },
    checkDeviceExistance:async(id,req)=>{
        const Device = req.models.device
        let data = await Device.find({userId:id})
        let deviceData = await Device.find({deviceId:req.headers.device_id})
        console.log('here1')

        if(data){
          console.log('here2')

            let deleteData = await Device.deleteMany({userId:id})
        }
        if(deviceData){
          console.log('here3')

          console.log(req.headers.device_id)
          let deleteData2 = await Device.deleteMany({deviceId:req.headers.device_id})
      }
        return true
    },
    generateAndSendOTP : async(id,req)=>{
        let fs = require("fs");
        let handlebars = require('handlebars');
        let nodemailer = require("nodemailer");
        let path = require("path");

        const User = req.models.user

        const otpVerified = 'false'
        const OTP = '0'
        const otpExpiresIn = ''
        const otpData = await User.findByIdAndUpdate(id, {otpVerified : otpVerified,OTP : OTP,otpExpiresIn:otpExpiresIn}, {upsert: true, new: true})
        
        if(otpData){
            let current_time = (new Date()).getTime();//epoch in miliseconds
            let otp_expirations_in = Math.round(current_time/1000);//epoch in seconds
            let newOTP = Math.floor(1000 + Math.random() * 9000);//otp to be send
            await User.findByIdAndUpdate(id, {otpVerified : otpVerified,OTP : newOTP,otpExpiresIn:otp_expirations_in}, {upsert: true, new: true})
            console.log(current_time,otp_expirations_in,newOTP)
            let replacements = {
                OTP: newOTP
            };
            let template_path = path.join(__dirname, "../", "templates/")
            let template_name = 'otp.html'
            let html = fs.readFileSync(template_path + template_name, "utf8");
            var template = handlebars.compile(html);
            var htmlToSend = template(replacements);
            
            var transporter = nodemailer.createTransport({
              host: process.env.SES_SERVER_NAME,
              port: process.env.SES_PORT,
              secure: process.env.USE_TLS,
              auth: {
                user: process.env.SES_USERNAME,
                pass: process.env.SES_PASSWORD
              }
          });
            let content = {
                from: process.env.SES_EMAIL, // sender address
                to: otpData.email, 
                subject: 'Attuned OTP',
                html: htmlToSend
            }

            // console.log(content)
            let info = transporter.sendMail({
                ...content

            }, (err, result) => {
                // if (err) console.log("error in send email function",err);
                // else console.log(result);
            });

        }
    },
    upload: async(req)=>{
          const fileUpload = require('express-fileupload');
          const path = require('path');
          const fs = require("fs");

          const common = require('../common')
          return new Promise((resolve, reject)=> {
            try{
              let file_to_upload = req.files ? req.files.image : '';
              // let file_to_upload = req.files.image
              //console.log(req.files)
              
              let absolute_path = path.join(__dirname, "../public/temp");
              if (!fs.existsSync(absolute_path)) {
                fs.mkdirSync(absolute_path, { recursive: true })
                fs.chmodSync(absolute_path, '775', function(err) {
                  if (err) throw err;
                });
              }
              var extension = file_to_upload.name.split('.').pop();
              // if (upload_type_allowed.includes("." + extension)) {
              var orignal_name = (new Date()).getTime() + "." + extension;
              //var orignal_name = file_to_upload.name;
              file_to_upload.mv(absolute_path + '/' + orignal_name, async(err) => {
                if (err) {
                  reject(err)
                  
                } else {
                  //Action as required
                  try{
                    let a = await saveToS3(req, orignal_name);
                    // console.log(a)
                    // console.log(orignal_name)
                    resolve(orignal_name)
                  }catch(err){
                    console.log(err)
                  }
                  
                }
              });
            }catch(err){
              reject(err)
            }
          })
    },
    uploadFile: async function(req, res,upload_type_allowed) {
      let common = require('../common')
      let file_to_upload = req.files ? req.files.file : '';
      let path = require('path')
      let fs = require('fs')
      return new Promise((resolve, reject)=> {
        try {
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
              // var orignal_name = file_to_upload.name.replace(/ /g, '_');
              var orignal_name = (new Date()).getTime() + "." + extension;
              file_to_upload.mv(absolute_path + '/' + orignal_name, async(err) => {
                if (err) {
                  reject(err)
                    //console.log(err)
                  // return res.status(common.http_status.HTTP_SERVER_ERROR).json({ status: false, code: common.http_status.HTTP_SERVER_ERROR, message: "Cannot Upload File To Server error - " + err });
                } else {  
                  // Save image to S3 Bucket
                  //console.log(orignal_name)
                  await saveToS3(req, orignal_name);
                  resolve ({ name: orignal_name, url: (process.env.BUCKET_ACCESS_URL + "common/" + orignal_name) })
                }
              });
            } else {
                reject(`Please upload only these types - ${upload_type_allowed} `)
              // res.status(common.http_status.HTTP_BAD_REQUEST).json({ status: common.http_status.ERROR, code: common.http_status.HTTP_BAD_REQUEST, message: 'Please upload only these types - ' + upload_type_allowed });
            }
    
          } else {
              reject('Please upload a file')
            // res.status(common.http_status.HTTP_BAD_REQUEST).json({ status: common.http_status.ERROR, code: common.http_status.HTTP_BAD_REQUEST, message: 'Please upload an image' });
          }
        } catch (err) {
            reject(err)
          // console.log(err)
          // return res.status(common.http_status.HTTP_SERVER_ERROR).json({ status: false, code: common.http_status.HTTP_SERVER_ERROR, message: "Cannot Upload File To Server error - " + err });
        }
      })
    },
    sendEmail : async(from_id, to_id, subject, template_name, replacements)=>{
      let fs = require("fs");
      let handlebars = require('handlebars');
      let nodemailer = require("nodemailer");
      let path = require("path");

            let template_path = path.join(__dirname, "../", "templates/")
            let html = fs.readFileSync(template_path + template_name, "utf8");
            var template = handlebars.compile(html);
            var htmlToSend = template(replacements);
            try{
              var transporter = nodemailer.createTransport({
                host: process.env.SES_SERVER_NAME,
                port: process.env.SES_PORT,
                secure: process.env.USE_TLS,
                auth: {
                  user: process.env.SES_USERNAME,
                  pass: process.env.SES_PASSWORD
                }
            });
            let content = {
                from: process.env.SES_EMAIL, // sender address
                to: to_id, 
                subject: subject,
                html: htmlToSend
            }

            
            let info = transporter.sendMail({
                ...content

            }, (err, result) => {
                  if (err) console.log("error in send email function",err);
                  else console.log(result);
            }); 
            }catch(err){
              console.log(err)
            }
     
    },
    generateVerificationEmail: async(token)=>{
      const crypto = require("crypto");
      let verifyEmailToken = crypto.createHash('sha256').update(token).digest('hex');
      // let resetPasswordExpires = Math.round(((new Date()).getTime()/1000));//epoch in seconds
      // helper.generateAndSendOTP(saveUsers.id, req) 
      let verifyEmailLink = `${process.env.BASE_URL}` + "verify-email" + "/" + verifyEmailToken;
      return verifyEmailToken
    },
    saveToS3: saveToS3,

    sendPushNotificationAdmin : async(userData)=>{
      var apn = require('apn');
      var mongoose = require('mongoose')
      var tokens = []
      var data = []
      var finalData = []
      console.log(userData)
      if(userData.userdata.length>0){
        for(i=0;i<userData.userdata.length;i++){
          if(userData.userdata[i].deviceToken && userData.userdata[i].isPushNotificationEnabled == true){
            tokens.push(userData.userdata[i].deviceToken)
            data.push(userData.userdata[i])
          }
        }
        //console.log("tokens",data)
        let payload = {
          type: "Admin Notifications",
          title : userData.notificationTitle,
          info: {}
        }
        let note = new apn.Notification({
          alert: userData.notificationMessage,
          sound: "Default",
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
        if(tokens.length > 0){
          service.send(note, tokens).then(result => {


            if (result.sent && result.sent != '') {
              //console.log(result.sent)
              
            } else {
              //console.log(result.failed[0].response)
  
            }
            
          })
        }
        

        if(data.length>0){
          for(i=0;i<data.length;i++){
            let doc = {}
            doc.fromId = '0'
            doc.toId = data[i]._id
            doc.message = userData.notificationMessage
            doc.notificationType = "push"
            doc.resourceId = '0'
            doc.isNewNotification = true
            doc.isRead = false
            doc.sentTo = 'user'
            doc.sentFrom = 'admin'
            doc.title = userData.notificationTitle
            doc.type = "Admin Notifications"
            doc.createdAt=Date.now()
            doc.updatedAt=Date.now()

            finalData.push(doc)
          }
          //console.log(finalData)
          await userData.req.models.notification.insertMany(finalData);
        }

      }
    },

    sendEmailNotificationAdmin : async(userData)=>{
      var mongoose = require('mongoose')
      var emails = []
      var data = []
      var finalData = []
      if(userData.userdata.length>0){
        for(i=0;i<userData.userdata.length;i++){
          if(userData.userdata[i].email){
            emails.push(userData.userdata[i].email)
            data.push(userData.userdata[i])
          }
        }
        //console.log("emails",data)
        data.map(async(doc)=>{
          let name = doc.name;
          // let template ='verifyEmail.html';
          let from_id = `${process.env.SES_EMAIL}`,
          to_id = doc.email,
          subject = userData.notificationTitle,
          template_name = 'adminEmail.html';
          replacements = { user: name, message: userData.notificationMessage/*, date: moment(new Date()).format("MMMM Do YYYY") */};
          await adminEmailNotification(from_id,to_id,subject,template_name,replacements);
        })
        if(data.length>0){
          for(i=0;i<data.length;i++){
            let doc = {}
            doc.fromId = '0'
            doc.toId = data[i]._id
            doc.message = userData.notificationMessage
            doc.notificationType = "email"
            doc.resourceId = '0'
            doc.isNewNotification = true
            doc.isRead = false
            doc.sentTo = 'user'
            doc.sentFrom = 'admin'
            doc.title = userData.notificationTitle
            doc.type = "Admin Notifications"

            finalData.push(doc)
          }
          //console.log(finalData)
          await userData.req.models.notification.insertMany(finalData);
        }

      }
    },
    saveLogs :async(req,helperData) =>{
      //console.log(helperData)
      let logs = new req.models.logs(helperData);
      logs.save();
    },

    getAllGenders :async(req)=>{
      return new Promise(async(resolve,reject)=>{
        try {
          const mongoose = require('mongoose')
          let data = []
          let questionId = await req.models.questions.aggregate([
            {
              $match:{questionOrder : 1}
            }
          ])

          //console.log(answers)
            let optionValue = await req.models.questionOptions.aggregate([
              {
                $match:{questionId:mongoose.Types.ObjectId(questionId[0]._id)}
              }
            ])
            //console.log(optionValue)
            optionValue.map(ele=>{
              data.push(ele.value)
            })
            resolve (data)
        } catch (error) {
            reject (error)
        }
      })
    },

    getAllGenderFrequency : async(req)=>{
      return new Promise(async(resolve,reject)=>{
        try {
          const mongoose = require('mongoose')
          //let data = []
          let genderFrequencyData = await req.models.genderFrequency.aggregate([
            {
              $project:{
                _id: 1,
                gender: 1,
                idealMinFrequency: 1,
                idealMaxFrequency: 1
              }
            }
          ])
            resolve (genderFrequencyData)
        } catch (error) {
            reject (error)
        }
      })
    },

    pushForReminder : async(userData)=>{
      const userSchema = require('../models/users')

      var apn = require('apn');
      var mongoose = require('mongoose')
      var tokens = []

      let userIds = []
      let userId = []
      if(userData.length>0){

        //get user ids
        userData.map(ele=>{
          userIds.push(ele.userId)
        })

        //concate type object id
        for(i=0;i<userIds.length;i++){
          //console.log(sendToIds[i])
          userId.push(mongoose.Types.ObjectId(`${userIds[i]}`))
        }

        //get user device data
        var deviceData = await userSchema.aggregate([
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

        /*============process of sending notification==========*/ 

        //pushing all device tokens in an array
        for(i=0;i<deviceData.length;i++){
          //console.log(deviceData[i])

          if(deviceData[i].deviceToken && deviceData[i].isPushNotificationEnabled == true){
            tokens.push(deviceData[i].deviceToken)
            //data.push(userData.userdata[i])
          }
        }

        //creating payload for notification
        let payload = {
          type: "Reminder",
          title : 'Reminder !!',
          info: {}
        }

        //creating note
        let note = new apn.Notification({
          alert: "Please record your task!",
          sound: "Default",
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

        // console.log(tokens)
        // console.log(note)
        // console.log(service)

        //sending notification
        if(tokens.length>0){
          service.send(note, tokens).then((result) => {
          
            if (result.sent && result.sent != '') {
              console.log(result.sent)
              
            } else {
              console.log(result)
  
            }
        
          }).catch(err=>{
            console.log(err)
          })
        }
        

        
      }
    },

    sendPushNotification : async(info)=>{
      const apn = require('apn')
      mongoose = require('mongoose')
      var tokens = []
      var data = []
      var finalData = []
      //console.log(data)
      if(info.userData.length>0){
        for(i=0;i<info.userData.length;i++){
          if(info.userData[i].deviceToken && info.userData[i].isPushNotificationEnabled == true){
            tokens.push(info.userData[i].deviceToken)
            data.push(info.userData[i])
          }
        }
        //console.log("tokens",data)
        let payload = {
          type    : info.notificationData.type,
          title   : info.notificationData.title,
          info    : info.notificationData.info
        }
        //console.log("payload type",payload)
        let note = new apn.Notification({
          alert: info.notificationData.message,
          sound: "Default",
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

        if(tokens.length>0){
          service.send(note, tokens).then(result => {


            if (result.sent && result.sent != '') {
              //console.log(result.sent)
              
            } else {
              //console.log(result.failed[0].response)
  
            }
            
          })
        }

        if(data.length>0){
          for(i=0;i<data.length;i++){
            let doc = {}
            doc.fromId = '0'
            doc.toId = data[i]._id
            doc.message = info.notificationData.message
            doc.notificationType = "push"
            doc.resourceId = info.notificationData.resource
            doc.isNewNotification = true
            doc.isRead = false
            doc.sentTo = 'user'
            doc.sentFrom = 'app'
            doc.title = info.notificationData.title
            doc.type = info.notificationData.type
            doc.createdAt=Date.now()
            doc.updatedAt=Date.now()

            finalData.push(doc)
          }
          //console.log(finalData)
          await info.notificationData.req.models.notification.insertMany(finalData);
        }

      }
    },

    adminEmailNotification : adminEmailNotification
    
}
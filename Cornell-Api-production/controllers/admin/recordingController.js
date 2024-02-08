module.exports = {
    saveRecordings: async(req,res) => {
        let common = require("../../common");
        let helper = require('../../helpers/common-helper')
        try{
            // if(req.session.user){
                const mongoose = require('mongoose');
                let id = req.body.recordingId;
                let recordingData = req.body.recordingData;
                if(id == null){
                    let addRecording = new req.models.recordings(recordingData)  
                    await addRecording.save();     
                    helper.saveLogs(req,{
                        APIName:"SaveRecordings",
                        request:JSON.stringify(req.body),
                        response:JSON.stringify({
                            status:common.http_status.SUCCESS, 
                            code:common.http_status.HTTP_SUCCESS, 
                            message:"Added Successfully"
                        })
                    
                    })
                    res.status(common.http_status.HTTP_SUCCESS).send({
                        status:common.http_status.SUCCESS, 
                        code:common.http_status.HTTP_SUCCESS, 
                        message:"Added Successfully"
                    })            
                }else{
                    await req.models.recordings.findByIdAndUpdate({_id:mongoose.Types.ObjectId(id                                       )},recordingData)    
                    helper.saveLogs(req,{
                        APIName:"SaveRecordings",
                        request:JSON.stringify(req.body),
                        response:JSON.stringify({
                            status:common.http_status.SUCCESS, 
                            code:common.http_status.HTTP_SUCCESS, 
                            message:"Updated Successfully"
                        })
                    
                    })
                    res.status(common.http_status.HTTP_SUCCESS).send({
                        status:common.http_status.SUCCESS, 
                        code:common.http_status.HTTP_SUCCESS, 
                        message:"Updated Successfully"
                    })            
                }
            // }else{
            //     return res.render('admin/index', {
            //         title: 'Login Page',
            //         error: false
            //     });
            // }
        }catch(err){
            console.log(err)
            helper.saveLogs(req,{
                APIName:"SaveRecordings",
                request:JSON.stringify(req.body),
                response:JSON.stringify({
                    status:common.http_status.ERROR, 
                    code:common.http_status.INTERNAL_SERVER_ERROR, 
                    message:common.message.INTERNAL_SERVER_ERROR
                })
            
            })
            res.status(common.http_status.INTERNAL_SERVER_ERROR).send({
                status:common.http_status.ERROR,
                code:common.http_status.INTERNAL_SERVER_ERROR,
                message:common.message.INTERNAL_SERVER_ERROR
            })
        }
    },
    recordingList: async(req,res) =>{
        let helper = require('../../helpers/common-helper');
        let common = require('../../common');
        try{
            let search = req.query.search;
            let perPage = common.constants.RECORDS_PER_PAGE
            let currentPage = req.query.page || 0
            let page = Math.max(0, currentPage)
            let recordingList
            if(search != null){
                recordingList = await req.models.recordings.find({
                    // $or:[
                        //{ 
                            isDeleted:false,
                            content:{$regex:search,$options: 'i'}
                        //}
                        // ,{
                        //     email:{$regex:search,$options: 'i'}
                        // }
                   // ]
                }).skip(perPage * page)
                .limit(perPage);
            }else{
                recordingList = await req.models.recordings.find({isDeleted:false}).skip(perPage* page).limit(perPage)
            }
            let count  = await req.models.recordings.find({isDeleted:false}).countDocuments();
            return res.render('admin/recordings', {
                error: false,
                message: "Successfully login!",
                data: {
                    recordingList:recordingList,
                    totalRecords: count,
                    recordsPerPage:perPage
                }
            });
        }catch(err){
            console.log(err)
            res.send(err)
        }
    },
    deleteRecording: async(req,res) =>{
        try{
           // if(req.session.user){
                const mongoose = require('mongoose');
                let recordingId = req.params.recordingId;
                let findRecording = await req.models.recordings.aggregate([
                    {$match:{_id:mongoose.Types.ObjectId(recordingId)}}
                ]);
                if(findRecording.length>0){
                    await req.models.recordings.findByIdAndUpdate(mongoose.Types.ObjectId(recordingId),{
                        isDeleted:true
                    })
                    res.status(200).send({
                        status:true,
                        code:200,
                        message:"Recording successfully deleted"
                    })
                }else{
                    res.status(401).send({
                        status:false,
                        code:401,
                        message:"Recording not found"
                    })
                }
            //}else{
                // return res.render('admin/index', {
                //     title: 'Login Page',
                //     error: false,
                //     message: ""
                //     // data: finalCountryData,
                //     // errorMessage:"",
                //     // domainUrl : "https://" ,
                //     // ampUrl: ampUrl,
                //     // searchQuery: searchQuery
                // });
            //}
        }catch(error){
            res.status(500).send({
                status:false,
                code:500,
                message:"Something went wrong"
            })
        }
        
        
    },
    getUserRecording:async(req,res)=>{
        try {
            var _ = require("lodash");
            let common = require('../../common');

            var mongoose = require('mongoose')
            var data = []
            var user_id = req.params.userId
            console.log(user_id)

            
            var data =await req.models.userRecordings.aggregate([
                {
                  $match:{ userId: mongoose.Types.ObjectId(user_id) }
                },
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
                    _id:0,
                    userRecordingName : '$recordingName',
                    avgFrequency:'$avgFrequency',
                    minFrequency:'$minFrequency',
                    maxFrequency:'$maxFrequency',
                    recordingUrl:'$recordingUrl',
                    duration:'$duration',
                    recordingContentName:'$data.recordingName',
                    recordingContent : '$data.content'
                  }
                }
              ])
              if(data. length > 0){
                data.map(newData=>{
                    newData.recordingUrl = process.env.BUCKET_ACCESS_URL+'common/'+ newData.recordingUrl
                })
              }
            //res.send(data)
            return res.render('admin/userRecordings', {
                error: false,
                message: "List",
                data : data
            });

        } catch (error) {
            console.log(error)
            res.send(error)
        }
    }
}
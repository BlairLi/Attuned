module.exports = {
    checkCron : (time=>{
        const mongoose          = require('mongoose');

        const cron              = require("node-cron");
        const helper            = require('./helpers/common-helper')
        const userSchema        = require('./models/users')
        const reminderSchema    = require('./models/reminder')
        cron.schedule(time,async()=>{
            try {
                let date = Math.round(((new Date).getTime())/1000)
                let maxDate = date + 30
                let minDate = date - 30
                //console.log(date)

                // console.log(minDate)
                // console.log(date)
                // console.log(maxDate)

                //fetching data according to reminder time  
                let operationData=await reminderSchema.find({nextReminderTime: {$gt: minDate, $lt: maxDate},status:true});

                //calling function for sending notification
                helper.pushForReminder(operationData)

                /**============Update records============ */
                operationData.map(async(ele)=>{
                    let data = {}
                    if(ele.repeatType == "daily"){
                        data = {
                            nextReminderTime : (parseInt(ele.nextReminderTime) + 86400).toString()
                        }

                    }else if(ele.repeatType == "week"){
                        data = {
                            nextReminderTime : (parseInt(ele.nextReminderTime) + 604800).toString()
                        }

                    }else if(ele.repeatType == "month"){
                        // logic needs to be written for various month days
                        data = {
                            //this is for 30 days only
                            nextReminderTime : (parseInt(ele.nextReminderTime) + 2592000).toString()

                        }

                    }else if(ele.repeatType == "year"){
                        //logic needs to be written for various year days
                        let data = {
                            //this is for 365 days only
                            nextReminderTime : ele.nextReminderTime + 2592000
                        }

                    }else if(ele.repeatType == "never"){
                        data = {
                            nextReminderTime : null
                        }
                    }else{
                        data = {
                            nextReminderTime : null
                        }
                    }

                    await reminderSchema.findByIdAndUpdate(mongoose.Types.ObjectId(ele._id),data)
                })
                // console.log(date)
                // console.log(operationData)
                 //console.log("====================")
                
            } catch (error) {
                console.log(error)
                console.log("app has crashed in cron")
            }
        })
        
    })
}
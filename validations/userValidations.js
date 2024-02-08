const Joi = require('@hapi/joi');
var answerObject = Joi.object().keys({
  questionId: Joi.string().required(),
  questionOptionId: Joi.any().default(''),
  otherAnswer: Joi.any().default('')
  });
module.exports = {
    saveAnswer: Joi.object({
        headers: {
          access_token: Joi.string().required()
        },
        body: {
          answer: Joi.array().items(answerObject).required()
        }
    }),
    login: Joi.object({
      body: {
        password: Joi.string().required(),
        email: Joi.string().required(),
      },
      headers: {
        device_token: Joi.any().default(''),
        device_type: Joi.any().default(''),
        device_id: Joi.any().default(''),
        app_version: Joi.any().default(''),
        device: Joi.any().default(''),
        badge: Joi.any().default(''),
      }
    }),
    signUp:Joi.object({
      body:{
        email:Joi.string().email(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        telephoneNumber: Joi.string(),
        admin: Joi.number().min(0).max(1)
      },
      headers: {
        device_token: Joi.any().default(''),
        device_type: Joi.any().default(''),
        device_id: Joi.any().default(''),
        app_version: Joi.any().default(''),
        device: Joi.any().default(''),
        badge: Joi.any().default(''),
      }
    }),
    verifyEmailToken:Joi.object({
      params:{
        verifyEmailToken : Joi.string().required()
      }
    }),
    verifyAccessCode: Joi.object({
      body: {
        accessCode: Joi.string().required()
      }
    }),
    getLessonList: Joi.object({
      headers:{
        access_token: Joi.string().required()
      }
    }),
    submitLessonFeedback: Joi.object({
      headers:{
        access_token: Joi.string().required()
      },
      body: {
        lessonId: Joi.string().required(),
        feedBack: Joi.boolean().required()
      }
    }),
    getHomeworkContentList: Joi.object({
      headers:{
        access_token: Joi.string().required()
      },
      params:{
        lessonId: Joi.string().required()
      }
    }),
    submitExerciseFeedback: Joi.object({
      headers:{
        access_token: Joi.string().required()
      },
      body: {
        lessonId: Joi.string().required(),
        exerciseId: Joi.string().required(),
        feedBack: Joi.boolean().required()
      }
    }),
    recordingTaskList: Joi.object({
      headers:{
        access_token: Joi.string().required()
      }
    }),
    saveRecording: Joi.object({
      headers:{
        access_token: Joi.string().required()
      },
      body: {
        recordingName: Joi.string().required(),
        recordingTaskId: Joi.string().required(),
        avgFrequency: Joi.number().required(),
        minFrequency: Joi.number().required(),
        maxFrequency: Joi.number().required(),
        count: Joi.number().required()
      }
    })
}

const Joi = require('@hapi/joi');
let options = Joi.object().keys({
  value : Joi.any().default(''),
  optionImg : Joi.any().default(''),
  optionDesc:Joi.any().default(''),
  sortOrder:Joi.number()
}),
lessonObject = Joi.object().keys({
  contentUrl: Joi.any().default(''),
  contentText: Joi.any().default(''),
  //: Joi.number().required(),
  contentOrder: Joi.number().required()
}),
homeworkDetailObject = Joi.object().keys({
  contentUrl: Joi.any().default(''),
  contentText: Joi.any().default(''),
  //duration: Joi.number().required(),
  contentOrder: Joi.number().required()
}),
homeworkObject = Joi.object().keys({
  name: Joi.string().required(),
  homeworkDetail: Joi.array().items(homeworkDetailObject).required()
})
module.exports = {
    createAdmin: Joi.object({
        // headers: {
        //   access_token: Joi.string().required()
        // },
        body: {
          email: Joi.string().required(),
          password: Joi.string().required(),
          name: Joi.string().required(),
          telephone: Joi.string().required(),
          admin: Joi.boolean()
        }
    }),
    saveQuestionnaire: Joi.object({
      body: {
        questionData: Joi.object().keys({
          question: Joi.string().required(),
          questionOrder: Joi.number().required(),
          id: Joi.string(),
          maxCharacter: Joi.number().min(1).default(20).required(),
          questionType: Joi.string().required(),
          maxAllowedAnswers : Joi.number().min(1).max(5).default(1).required(),
          isDeleted : Joi.boolean().default(false),
          screen: Joi.number().required(),
          minimumValue:Joi.any().default(''),
          maximumValue:Joi.any().default(''),
          midValue:Joi.any().default('')
        })
        
      }
    }),
    deleteQuestionnaire: Joi.object({
      params: {
        id: Joi.string()
      },
      headers: {
        access_token: Joi.string().required()
      }
    }),
    saveAccessCode: Joi.object({
      body: {
        accessCode: Joi.string().alphanum().required(),
        id: Joi.string(),
        isEnabled: Joi.boolean().required()
      }
    }),
    deleteAccessCode: Joi.object({
      params: {
        id: Joi.string()
      },
      headers: {
        access_token: Joi.string().required()
      }
    }),
    saveLessons: Joi.object({
      body: {
        lessonName: Joi.string().required(),
        lessonContent: Joi.array().items(lessonObject).required(),
        homeWorktotalTime : Joi.number(),
        totalTime : Joi.number(),
        sortOrder :Joi.number(),
        id: Joi.any().default('')
      }
    }),
    saveHomework: Joi.object({
      body: {
        homework: Joi.array().items(homeworkObject).required()
      },
      params: {
        lessonId: Joi.string().required()
      }
    }),
    lessonList: Joi.object({
      query:{
        page: Joi.number().required()
      }
    })
}

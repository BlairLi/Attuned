const Joi = require('@hapi/joi');
module.exports = {
  forgotPassword: Joi.object({
    body: {
      email: Joi.string().required(),
    },
  }),
  resetPassword: Joi.object({
    params: {
      token: Joi.string().required(),
    },
    body: {
      password: Joi.string().required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
    },
  })
}
module.exports = function validate(schema) {
    const Joi = require('@hapi/joi');
    var Extend = require('extend');
    var options = {
      // return an error if body has an unrecognised property
      allowUnknown: false,
      stripUnknown: { objects: true },
      //stripUnknown: true,
    
      // return all errors a payload contains, not just the first one Joi finds
      abortEarly: false
    };
  return function validateRequest(req, res, next) {

    var toValidate = {};
    if (!schema) {
      return next();
    }

    ['params', 'body', 'query', 'headers'].forEach(function(key) {
      if (schema[key]) {
        toValidate[key] = req[key];
      }
    });
    
    var resp = schema.validate(req,options);
    if(resp.error){
      let keyName = capitalizeFirstLetter(resp.error.details[0].context.key);
      let labelName = resp.error.details[0].context.label;
      let message = resp.error.details[0].message;
      if(labelName && labelName.indexOf(".") !== -1){
      		message = message.replace(labelName, keyName);
      }

      return res.status(400).send({
        status: false,
        code: 400,
        message: message,
        errors:message
      });
    }else{
      return next();
    }
    
    /*function onValidationComplete(err, validated) {
      if (err) {
        // logger.log('Validation Errors', validated, err, 'user', 0);
        return res.status(400).send({
          status: false,
          code: 400,
          message: "Validation errors!",
          errors: err.details
        });
        //return next(Boom.badRequest(err.message, err.details));
      }

      // copy the validated data to the req object
      Extend(req, validated);

      return next();
    }*/ 
  }
};
function capitalizeFirstLetter(string) {
  if(!string){
	 return string;  		
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}


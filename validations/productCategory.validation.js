const Joi = require("@hapi/joi");

exports.productCategoryValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
});

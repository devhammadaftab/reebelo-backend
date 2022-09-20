const Joi = require("@hapi/joi");

exports.productValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().required(),
  stock: Joi.number().required(),
  category: Joi.string().required(),
  description: Joi.string(),
});

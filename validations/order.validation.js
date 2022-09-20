const Joi = require("@hapi/joi");

exports.orderValidation = Joi.object({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  contact: Joi.string().required(),
  address: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.number().required(),
  }).required(),
  cart: Joi.array()
    .items({
      productId: Joi.string().required(),
      quantity: Joi.number().required(),
    })
    .required(),
});

exports.orderAddressValidation = Joi.object({
  address: Joi.object({
    address: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.number().required(),
  }).required(),
});

exports.orderStatusValidation = Joi.object({
  status: Joi.string().valid("processing", "cancelled", "delivered"),
});

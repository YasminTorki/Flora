const Joi = require("@hapi/joi");
const addFlower = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  discount: Joi.number().default(0),
  category: Joi.string().required(),
  count: Joi.number().required(),
  type: Joi.string().required(),
  desc: Joi.string().required(),
  size: Joi.object().default(),
//   Image:

});

module.exports = {
    addFlower,
  };
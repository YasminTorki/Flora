const Joi = require("@hapi/joi");
const authSchema = Joi.object({
  name: Joi.string().required(),
  Lastname: Joi.string().required(),
  email: Joi.string().lowercase().trim().email().required().messages({
    "any.required": "ایمیل الزامی است",
    "string.email": "ایمیل وارد شده باید صحیح باشد",
  }),
  password: Joi.string().min(6).trim().required().messages({
    "any.required": "وارد کردن پسورد الزامی است",
    "string.min": "طول کلمه عبور حداقل شش کاراکتر است",
  }),
  Role: Joi.string(),
}).options({ abortEarly: false });

module.exports = {
  authSchema,
};

const Joi = require("joi");

const registerValidator = Joi.object({
  firstname: Joi.string().required().max(20),
  lastname: Joi.string().required().max(20),
  email: Joi.string().required().email(),
  mobile: Joi.string().length(10),
  password: Joi.string()
    .min(3)
    .max(30)
    .required()
    // .regex(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{3,}$/
    // )
    // .messages({
    //   "string.pattern.base":
    //     "Password must contain at least uppercase, lowercase, number and special character.",
    //   "string.min": "Password should have a minimum length of 3 characters.",
    //   "string.max": "Password should have a maximum length of 30 characters.",
    //   "any.required": "Password must be provided.",
    // }),
});

const loginValidator = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().min(3).max(30).required(),
});

module.exports = { registerValidator, loginValidator };

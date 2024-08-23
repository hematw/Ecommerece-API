const User = require("../models/User");
const registerValidator = require("../validators/registerValidator");
const asyncHandler = require("../middleware/asyncHandler");
const { StatusCodes } = require("http-status-codes");
const ValidationError = require("../errors/validationError");

const registerUser = asyncHandler(async (req, res) => {
  const { error, value } = registerValidator.validate(req.body);

  if (error) throw new ValidationError(error.message, StatusCodes.BAD_REQUEST);

  const foundUser = await User.findOne({ where: { email: value.email } });
  if (foundUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: "User already exists!",
    });
  }

  await User.create(value);
  return res.json({ success: true, msg: `User ${req.user} created` });
});

module.exports = {
  registerUser,
};

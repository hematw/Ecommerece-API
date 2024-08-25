const User = require("../models/User");
const {
  registerValidator,
  loginValidator,
} = require("../validators/userValidator");
const asyncHandler = require("../middleware/asyncHandler");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { error, value } = registerValidator.validate(req.body);

  if (error) throw new CustomError(error.message, StatusCodes.BAD_REQUEST);

  const foundUser = await User.findOne({ where: { email: value.email } });
  if (foundUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      msg: `User already exists with ${foundUser.dataValues.email}`,
    });
  }

  const salt = await bcrypt.genSalt(10);
  value.password = await bcrypt.hashSync(value.password, salt);
  const newUser = await User.create(value);
  return res.json({
    success: true,
    msg: `User ${newUser.firstname} successfully created`,
  });
});

const login = asyncHandler(async (req, res) => {
  const { error, value } = loginValidator.validate(req.body);
  if (error) throw new CustomError(error.message, StatusCodes.BAD_REQUEST);
  const { email, password } = value;

  const user = await User.findOne({ where: { email } });
  if (user) {
    const compareResult = await bcrypt.compare(password, user.password);
    if (compareResult) {
      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });
      return res
        .status(StatusCodes.OK)
        .json({ success: true, id: user.id, token });
    }
  }
  throw new CustomError(`Wrong credentials!`, StatusCodes.UNAUTHORIZED);
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(StatusCodes.OK).json({ success: true, users });
});

const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (user) {
    return res.status(StatusCodes.OK).json({ success: true, user });
  }
  throw new CustomError(`user with id ${id} NOT found!`, StatusCodes.NOT_FOUND);
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  if (user) {
    await User.destroy({ where: { id } });
    return res.status(StatusCodes.OK).json({
      success: true,
      msg: `user with id ${id} successfully deleted`,
      deletedUser: user,
    });
  }
  throw new CustomError(`user with id ${id} NOT found!`, StatusCodes.NOT_FOUND);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id);

  if (user) {
    await User.update(req.body, { where: { id } });
    return res.status(StatusCodes.OK).json({
      success: true,
      msg: `user with id ${id} successfully updated.`,
      updatedUser: user,
    });
  }
  throw new CustomError(`user with id ${id} NOT found!`, StatusCodes.NOT_FOUND);
});

module.exports = {
  registerUser,
  login,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
};

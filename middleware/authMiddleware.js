const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors/customError");
const User = require("../models/User");
const asyncHandler = require("./asyncHandler");
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/UnauthorizedError");

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new CustomError("no token provided", StatusCodes.UNAUTHORIZED);
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new UnauthorizedError()
    }
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthorizedError()
  }
});

const isAdmin = asyncHandler((req, res, next) => {
  console.log(req.user);
  next();
});

module.exports = { authMiddleware, isAdmin };

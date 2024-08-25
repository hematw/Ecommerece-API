const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class UserNotFoundError extends CustomError {
  constructor(id) {
    `user with id ${id} NOT found!`, StatusCodes.NOT_FOUND;
  }
}

module.exports = UserNotFoundError;

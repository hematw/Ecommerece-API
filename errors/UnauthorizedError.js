const { StatusCodes } = require("http-status-codes");
const CustomError = require("./customError");

class UnauthorizedError extends CustomError {
  constructor() {
    super(
      "Authentication failed. Invalid or expired token.",
      StatusCodes.UNAUTHORIZED
    );
  }
}

module.exports = UnauthorizedError;

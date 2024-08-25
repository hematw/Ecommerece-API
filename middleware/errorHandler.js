const { ValidationError, DatabaseError, UniqueConstraintError } = require("sequelize");
const CustomError = require("../errors/customError");
const { StatusCodes } = require("http-status-codes");

function errorHandler(err, req, res, next) {
  console.log(err)
  if (err instanceof CustomError) {
    return  res.status(err.statusCode).json({ success: false, err: err.message });
  }

  if (err instanceof DatabaseError || err instanceof  UniqueConstraintError) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, err: err.errors[0].message  });
  }
  res.status(500).json({ success: false, err: "Internal server error!" });
}

module.exports = errorHandler;

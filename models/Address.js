const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");

const Address = sequelize.define("Address", {
  country: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  destrict: { type: DataTypes.STRING },
  street: { type: DataTypes.STRING },
});

module.exports = Address;

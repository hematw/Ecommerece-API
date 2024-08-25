const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConn");

const Product = sequelize.define("Address", {
  name: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  destrict: { type: DataTypes.STRING },
  street: { type: DataTypes.STRING },
});

module.exports = Product;
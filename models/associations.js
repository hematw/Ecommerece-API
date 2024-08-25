const Address = require("./Address");
const Product = require("./Product");
const User = require("./User");
const sequelize = require("../config/dbConn")

User.hasOne(Address, {foreignKey: 'userId', as: 'UserAddress'})
Address.belongsToMany(User, {foreignKey: 'userId', as: 'UserAddress'})
Product.belongsToMany(User, {through: "Wishlist"})
User.belongsToMany(Product, {through: "Wishlist"})
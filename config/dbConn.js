const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ecommerce", "root", "enter 123", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log("Error: ", err));

// sequelize.sync({force: true});

module.exports = sequelize;

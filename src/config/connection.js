const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
const sequelize = new Sequelize("heroku_752431466c2cb37", "bd5053c9e62d57", "19015c7a", {
  host: 'us-cdbr-east-06.cleardb.net',
  dialect: 'mysql',
  port: 3306
});

module.exports = sequelize;
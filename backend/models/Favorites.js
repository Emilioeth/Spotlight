const { Model, DataTypes } = require('sequelize');
const sequelize = require('./config/connection');

class Favorites extends Model {}

module.exports = Favorites;
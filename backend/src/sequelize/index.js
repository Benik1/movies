const { Sequelize } = require('sequelize');

const { environment } = require('../constants');

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
} = environment;

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;

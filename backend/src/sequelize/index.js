const { Sequelize } = require('sequelize');

const DATABASE_NAME = '';
const DATABASE_USERNAME = '';
const DATABASE_PASSWORD = '';
const DATABASE_HOST = '';

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: 'postgres',
});

module.exports = sequelize;

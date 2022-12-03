const dotenv = require('dotenv');
const { config } = dotenv;
config();

const PORT = process.env.PORT || '4000';

const DATABASE_HOST = process.env.DATABASE_HOST || '';
const DATABASE_NAME = process.env.DATABASE_NAME || '';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || '';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

module.exports = {
  PORT,
  JWT_SECRET_KEY,
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
}
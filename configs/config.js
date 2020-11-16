require('dotenv').config();

const {
  NODE_ENV,
  PORT = 3001,
  BASE_PATH = '/',
  JWT_SECRET_PROD,
  JWT_EXPIRY_DAYS = 7,
  DATABASE_ADDRESS = 'mongodb://localhost:27017/news_explorer',
  JWT_COOKIE_NAME = 'nexpl-jwt',
} = process.env;

const JWT_SECRET_DEV = '3e43db7c07c391400256fbe0f17b732a593ccdebeab36d99689f2a60a7f56db7';
const JWT_SECRET = NODE_ENV === 'production' ? JWT_SECRET_PROD : JWT_SECRET_DEV;
const CORS_ORIGINS = [
  'http://localhost:8080',
  'http://localhost:8081',
  'https://vitalytikhonov.github.io',
  'https://vitaliytikhonov.ru',
  'http://vitaliytikhonov.ru',
];

module.exports = {
  NODE_ENV,
  PORT,
  BASE_PATH,
  DATABASE_ADDRESS,
  JWT_SECRET,
  JWT_EXPIRY_DAYS,
  JWT_COOKIE_NAME,
  CORS_ORIGINS,
};

// Heroku to Directus mappings
const parseDbUrl = require("parse-database-url");
const dbConfig = parseDbUrl(process.env.DATABASE_URL);

module.exports = {
  DB_CLIENT: parseDbUrl(process.env.DATABASE_URL).driver || "walo",
  DB_HOST: parseDbUrl(process.env.DATABASE_URL).host || "walo",
  DB_PORT: parseDbUrl(process.env.DATABASE_URL).port || "walo",
  DB_DATABASE: parseDbUrl(process.env.DATABASE_URL).database || "walo",
  DB_USER: parseDbUrl(process.env.DATABASE_URL).user || "walo",
  DB_PASSWORD: parseDbUrl(process.env.DATABASE_URL).password,

  DB_CONNECTION_STRING:
    process.env.DB_CONNECTION_STRING || process.env.DATABASE_URL,
  RATE_LIMITER_REDIS: process.env.RATE_LIMITER_REDIS || process.env.REDIS_URL,
  CACHE_REDIS: process.env.CACHE_REDIS || process.env.REDIS_URL,
  EMAIL_FROM: process.env.EMAIL_FROM || process.env.MAILGUN_SMTP_LOGIN,
  EMAIL_SMTP_HOST:
    process.env.EMAIL_SMTP_HOST || process.env.MAILGUN_SMTP_SERVER,
  EMAIL_SMTP_PORT: process.env.EMAIL_SMTP_PORT || process.env.MAILGUN_SMTP_PORT,
  EMAIL_SMTP_USER:
    process.env.EMAIL_SMTP_USER || process.env.MAILGUN_SMTP_LOGIN,
  EMAIL_SMTP_PASSWORD:
    process.env.EMAIL_SMTP_PASSWORD || process.env.MAILGUN_SMTP_PASSWORD,
};

// {
//   "driver": "mysql",
//   "user": "root",
//   "password": "password123",
//   "host": "localhost",
//   "port": "3306",
//   "database": "app_db"
// }

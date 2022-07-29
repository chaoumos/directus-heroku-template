// Heroku to Directus mappings
const parseDbUrl = require("parse-db-url");
const dbConfig = parseDbUrl(process.env.DATABASE_URL);

// # # Postgres
// # DB_CLIENT="pg"
// # DB_HOST="localhost"
// # DB_PORT=5432
// # DB_DATABASE="directus"
// # DB_USER="postgres"
// # DB_PASSWORD="secret"
// admin@example.com"
// ✨ No admin password provided. Defaulting to "o7ouyWgQAb7X"

module.exports = {
  DB_CLIENT: process.env.DB_CLIENT || "pg",
  DB_HOST: dbConfig.host,
  DB_PORT: dbConfig.port,
  DB_DATABASE: dbConfig.database,
  DB_USER: dbConfig.user,
  DB_PASSWORD: dbConfig.password,
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

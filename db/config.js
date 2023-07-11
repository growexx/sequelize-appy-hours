const dotenv = require("dotenv")
const env = process.env.NODE_ENV || "local"
dotenv.config({ path: env + ".env" })

module.exports = {
  database: process.env.DB_NAME,
  host: process.env.DB_MASTER_HOSTNAME,
  dialect: "mysql",
  logging: false,
  username: process.env.DB_USER_NAME,
  password: process.env.DB_PASSWORD
}

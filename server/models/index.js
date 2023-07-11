const dbConfig = require("../../db/config.js")
const fs = require("fs")
const path = require("path")
const basename = path.basename(module.filename)

const { Sequelize } = require("sequelize")

const db = {}
const sequelize = new Sequelize(dbConfig.database, null, null, dbConfig)

db.Sequelize = Sequelize
db.sequelize = sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.")
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err)
  })

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))
    db[file.split(".")[0]] = model(sequelize, Sequelize)
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync db.")
})

module.exports = db

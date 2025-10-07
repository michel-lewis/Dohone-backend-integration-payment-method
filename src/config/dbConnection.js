const {Sequelize, Dialect} = require('sequelize')
require ('dotenv').config()

const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASSWORD || ""
const dbHost = process.env.DB_HOST
const dbDialect = "mysql"

if(!dbName || !dbUser || !dbPassword || !dbHost){
    console.log("value gett from .env file", dbName, dbUser, dbPassword, dbHost)
    throw new Error("Please provide all database credentials")
}

const dbConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDialect
})

module.exports = dbConnection

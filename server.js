require("dotenv").config() // Load .env file
const mysql = require("mysql")
const bodyParser = require("body-parser")
const PORT = process.env.PORT
const MYSQL_HOST = process.env.DB_HOST
const MYSQL_USER = process.env.DB_USER
const MYSQL_PW = process.env.DB_PASSWORD
const MYSQL_DB = process.env.DB_NAME
const MYSQL_TABLE = process.env.DB_TABLE_NAME

// MySQL Connection
const connection = mysql.createConnection({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PW,
  database: MYSQL_DB,
})

connection.connect((err) => {
  if (err) return console.error(err.message)

  console.log(`Connected to the ${MYSQL_DB} Database!`)
})

const express = require("express")
const app = express()

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"))
})

app.listen(PORT)

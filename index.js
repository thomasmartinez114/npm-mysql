require("dotenv").config() // Load .env file
const mysql = require("mysql")
const bodyParser = require("body-parser")
const PORT = process.env.PORT

// MySQL Configuration
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

// MySQL Queries
// connection.query(`DESCRIBE ${MYSQL_TABLE}`, (error, results) => {
//   if (error) {
//     throw error
//   }
//   console.log(`${MYSQL_TABLE} Description:`, results)
// })

// MySQL Query - New User
connection.query(
  `INSERT INTO ${MYSQL_TABLE} (FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary) VALUES ('Pedro', 'Martinez', 'MIS', 'Tech Support', '2019-02-16', '9999-12-31', '75000')`,
  (err, results) => {
    if (err) {
      throw error
    }
    console.log("New User Added!")
  }
)

// const express = require("express")
// const app = express()

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, "/index.html"))
// })

// app.listen(PORT)

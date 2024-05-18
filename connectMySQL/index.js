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

  console.log(`Connected to the Database!`)
})

// Define data to be inserted
const employee = {
  FirstName: "Raul",
  LastName: "Martinez",
  Department: "MIS",
  JobTitle: "Tech Support",
  StartDate: "2016-02-15",
  EndDate: "9999-12-31",
  Salary: "75000",
}

// MySQL Insert Query
const insertQuery = `INSERT INTO ${MYSQL_TABLE} SET ?`

const express = require("express")
const app = express()

app.get("/", function (req, res) {
  // destructure employee object
  const {
    FirstName,
    LastName,
    Department,
    JobTitle,
    StartDate,
    EndDate,
    Salary,
  } = employee

  // MySQL Query - New User
  connection.query(
    `${insertQuery}`,
    { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary },
    (err) => {
      if (err) throw err
      console.log("1 record inserted")
      res.send("Employee added successfully")
    }
  )
})

app.listen(PORT, () => {
  console.log(`Node.js server running at http://localhost:${PORT}`)
})

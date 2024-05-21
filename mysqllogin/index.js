require("dotenv").config() // Load .env file
const mysql = require("mysql")
const bodyParser = require("body-parser")
const PORT = process.env.PORT

// MySQL Configuration
const HOST = process.env.DB_HOST
const DBUSERNAME = process.env.DB_USER
const DBPW = process.env.DB_PASSWORD
const DATABASE = process.env.DB_NAME
const TABLE = process.env.DB_TABLE_NAME

// MySQL Connection
const db = mysql.createConnection({
  host: HOST,
  user: DBUSERNAME,
  password: DBPW,
  database: DATABASE,
})

db.connect((err) => {
  if (err) return console.error(err.message)

  console.log(`Connected to the Database!`)
})

// init express server
const express = require("express")
const app = express()

// init ejs to display form
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))

// home page route
app.get("/", (req, res) => {
  res.render("home")
})

// login page route
app.get("/login", (req, res) => {
  res.render("login-form")
})

// API endpoint for submit
app.post("/submit", (req, res) => {
  const { username, password } = req.body // pull data submitted on form

  const query = `SELECT * FROM ${TABLE} where username = ?` // MySQL query to select from username submitted

  db.query(query, [username], (err, result) => {
    if (err) {
      throw err
    }
    const loginDetails = result[0] // use 0 index from obj result

    // if username matches username in result obj and password match
    if (username === loginDetails.username && password === loginDetails.creds) {
      console.log(`User ${username} has logged in`)
      res.render("login-success") // route to login-success.ejs
    } else {
      console.log("Login Failed")
      res.render("login-fail") // route to login-fail
    }
  })
})

app.listen(PORT, () => {
  console.log(`Node.js server running at http://localhost:${PORT}`)
})

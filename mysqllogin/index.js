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

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/login", (req, res) => {
  res.render("login-form")
})

app.post("/submit", (req, res) => {
  const { username, password } = req.body

  // check if input username and password returns a match from mysql select query

  const query = `SELECT * FROM ${TABLE} where username = ?`

  db.query(query, [username], (err, result) => {
    if (err) {
      throw err
    }
    res.render("logged") // route to logged.ejs
  })
  console.log("User has logged in")
})

app.listen(PORT, () => {
  console.log(`Node.js server running at http://localhost:${PORT}`)
})

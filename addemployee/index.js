const express = require("express")
const path = require("path")
const app = express()
const mysql = require("mysql")
const bodyParser = require("body-parser")

// dotenv
require("dotenv").config()
const PORT = process.env.PORT

//   MySQL Connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  tableName: process.env.DB_TABLE_NAME,
})

connection.connect((err) => {
  if (err) throw err
  console.log("Connected to MySQL Server!")
})

// Middleware to parse JSON Bodies
app.use(bodyParser.json())

// Set the view engine to EJS
app.set("view engine", "ejs")

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, "public")))

// Define route to render the html
app.get("/", (req, res) => {
  res.render("index")
})

app.get("/addNew", (req, res) => {
  res.render("addNew")
})

// Define API Endpoint
app.post("/addEmployee", (req, res) => {
  const {
    FirstName,
    LastName,
    Department,
    JobTitle,
    StartDate,
    EndDate,
    Salary,
    Email,
  } = req.body

  // Query to create new user
  connection.query(
    `INSERT INTO ${process.env.DB_TABLE_NAME} SET ?`,
    {
      FirstName,
      LastName,
      Department,
      JobTitle,
      StartDate,
      EndDate,
      Salary,
      Email,
    },
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

//   // Employee Object
//   const employee = {
//     FirstName: "Charles",
//     LastName: "DeGaul",
//     Department: "President",
//     JobTitle: "Quasi-Fascist Dictator",
//     StartDate: "2022-01-01",
//     EndDate: null,
//     Salary: 11112000,
//   }

//   // Destructuring employee obj
//   const {
//     FirstName,
//     LastName,
//     Department,
//     JobTitle,
//     StartDate,
//     EndDate,
//     Salary,
//   } = employee

// app.post('/addemployee', (req, res) => {
// const { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary } = employee;
// connection.query('INSERT INTO employees SET ?', { FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary }, err => {
//     if (err) throw err;
//     console.log('1 record inserted');
//     res.send('Employee added successfully');

//     // res.redirect('/listemployee'); // Redirect to list employees after adding
// });

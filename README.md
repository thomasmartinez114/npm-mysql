### INSTALLED PACKAGES

- dotenv
- mysql
- body-parser
- express

### DOTENV CONTENT - .env

```DB_HOST=localhost
DB_USER=[username]
DB_PASSWORD=[password]
DB_NAME=[database name]
DB_TABLE_NAME=[database table name]
PORT=3000
```

### CONNECT INDEX TO MYSQL - index.js

```
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
```

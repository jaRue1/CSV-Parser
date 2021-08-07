const mysql = require("mysql")

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password@123",
  database: "AnimeDB",
})

let query = ""
db.connect((err) => {
  // Connecting to DB
  if (err) throw err
  console.log("Connection Established")

  query = "DROP TABLE IF EXISTS ANIME" // DROP TABLE CMD
  db.query(query, (err) => {
    // executes query
    if (err) throw err
    console.log("Anime Table was dropped")
  })

  // created a table with specific columns
  query = "CREATE TABLE ANIME (row_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), " 
    + "anime_id INT, type VARCHAR(255), episodes INT, rating DECIMAL, members INT)"

  db.query(query, (err) => {
    // executes query
    if (err) throw err
    console.log("Anime table created.")
  })

  // import the animeTable csv file into SQL DB / while ignoring the the first line of the file (headers)
  query = "LOAD DATA LOCAL INFILE 'csv/animeTable.csv' INTO TABLE ANIME FIELDS TERMINATED BY ',' IGNORE 1 LINES"
   +  "(name,anime_id,type,episodes,rating,members)" // order in which to put the columns

  db.query(query, (err) => {
    // executes query
    if (err) throw err
    console.log("Anime Table Loaded.")
  })

  db.end( err => {
    // closing connection to mysql DB
    if (err) throw err
    console.log("All Done closing connection")
  })
})

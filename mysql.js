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
  executeQuery(query, "Anime Table was dropped")

  // created a table with specific columns
  query = "CREATE TABLE ANIME (row_id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), " 
    + "anime_id INT, type VARCHAR(255), episodes INT, rating DECIMAL, members INT)"
  
  executeQuery(query, "Anime table created.")

  // import the animeTable csv file into SQL DB / while ignoring the the first line of the file (headers)
  query = "LOAD DATA LOCAL INFILE 'csv/animeTable.csv' INTO TABLE ANIME FIELDS TERMINATED BY ',' IGNORE 1 LINES"
   +  "(name,anime_id,type,episodes,rating,members)" // order in which to put the columns
 
   executeQuery(query, "Anime Table Loaded\n")
 
  // drop table statements
  query = "DROP TABLE IF EXISTS GENRES";
  executeQuery(query, "Genre Table Dropped.")

  query = "DROP TABLE IF EXISTS ANIME_GENRE";
  executeQuery(query, "Anime_Genre Table Dropped.")

  query = "DROP TABLE IF EXISTS REVIEWS";
  executeQuery(query, "Reviews Table Dropped.")

  query = "DROP TABLE IF EXISTS USERS";
  executeQuery(query, "Users Table Dropped.")

  query = "DROP TABLE IF EXISTS USER_REVIEW";
  executeQuery(query, "User_Review Table Dropped\n")

  // create table statement
  query = "CREATE TABLE GENRES (genre VARCHAR(255), id INT)"
  executeQuery(query, "Genres Table Created")

  query = "CREATE TABLE ANIME_GENRE (row_id INT AUTO_INCREMENT PRIMARY KEY, anime_id INT, genre_id INT)"
  executeQuery(query, "Anime_Genre Table Created")

  query = "CREATE TABLE REVIEWS (row_id INT AUTO_INCREMENT PRIMARY KEY, review VARCHAR(255), anime_id INT, user_id INT, date_time DATETIME)"
  executeQuery(query, "Reviews Table Created")

  query = "CREATE TABLE USERS (user_id INT, first_name VARCHAR(255), last_name VARCHAR(255), "
    + "email VARCHAR(255), gender VARCHAR(255), username TEXT, "
    + "password VARCHAR(255), avatar_image VARCHAR(255), hex_color VARCHAR(255))"
    executeQuery(query, "Users Table Created")

  query = "CREATE TABLE USER_REVIEW (user_id INT, review VARCHAR(255))"
  executeQuery(query, "User_Review Table Created\n")

  // load table statements
  
  query = "LOAD DATA LOCAL INFILE 'csv/genresTable.csv' INTO TABLE GENRES FIELDS TERMINATED BY ',' IGNORE 1 LINES"
  executeQuery(query, "Genres Table Loaded")

  query = "LOAD DATA LOCAL INFILE 'csv/animeGenreTable.csv' INTO TABLE ANIME_GENRE FIELDS TERMINATED BY ','"
    + "IGNORE 1 LINES (anime_id, genre_id)"
  executeQuery(query, "Anime_Genres Table Loaded")

  query = "LOAD DATA LOCAL INFILE 'csv/reviewsTable.csv' INTO TABLE REVIEWS FIELDS TERMINATED BY ',' "
    + "IGNORE 1 LINES (review, anime_id, user_id, date_time)"
    executeQuery(query, "Reviews Table Loaded")

  query = "LOAD DATA LOCAL INFILE 'csv/usersTable.csv' INTO TABLE USERS FIELDS TERMINATED BY ',' IGNORE 1 LINES "
    + "(user_id, first_name, last_name, email, gender, username, password, avatar_image, hex_color)"
    executeQuery(query, "Users Table Loaded")

  query = "LOAD DATA LOCAL INFILE 'csv/userReviewTable.csv' INTO TABLE USER_REVIEW FIELDS TERMINATED BY ',' IGNORE 1 LINES "
    + "(user_id, review)"
    executeQuery(query, "User_Review Table Loaded\n")
  db.end( err => {
    // closing connection to mysql DB
    if (err) throw err
    console.log("All Done closing connection")
  })
})
// reusable function that executes SQL queries 
function executeQuery(query,msg){
  db.query(query, (err) =>{
    if (err) throw err
  })
  console.log(msg)
}
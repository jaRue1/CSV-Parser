const express = require('express'); // imported express 
const mysql = require('mysql') // imported mysql
const cors = require('cors') // imported cors
const bodyParser = require('body-parser')
const app = express() // assigned the express lib to the variable app
const port = 4000 // assigned a port 

const db = mysql.createConnection({ // connected to mySQL DB 
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Password@123",
  database: "AnimeDB",
  multipleStatements: true
})
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json)

function executeQuery(query,res){ // reusable function that runs sql queries
  db.query(query, (err,rows) =>{
    if(err) throw err
    res.send(rows)
  })
}

app.get('/getAllAnime',(req, res) => { // get api point - pulls all data from SQL DB table ANIME
  const query = "SELECT * FROM ANIME" // sql query
  executeQuery(query,res)
})

app.get('/deleteAnime/:id', (req,res) => {// get api point that deletes a row from the DB
  const query = `DELETE FROM ANIME WHERE anime_id = ${req.params.id}`
  executeQuery(query,res)
})

app.get('/resetAnime',(req,res) => {
  const query = "DROP TABLE IF EXISTS Anime;"+
    "CREATE TABLE Anime (row_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), anime_id INT, type VARCHAR(255), episodes INT, rating DECIMAL, members INT);" +
    "LOAD DATA LOCAL INFILE 'csv/animeTable.csv' INTO TABLE Anime FIELDS TERMINATED BY ',' IGNORE 1 LINES (name, anime_id, type, episodes, rating, members);"
    executeQuery(query,res)
})

app.get('/resetAnimeGenre', (req,res) => {
  const query = "DROP TABLE IF EXISTS Anime_Genre;"
  "CREATE TABLE Anime_Genre (row_id INT AUTO_INCREMENT PRIMARY KEY, anime_id INT, genre_id INT);" +
    "LOAD DATA LOCAL INFILE 'csv/animeGenreTable.csv' INTO TABLE Anime_Genre FIELDS TERMINATED BY ',' IGNORE 1 LINES (anime_id, genre_id);"
    executeQuery(query,res)
})

 app.get('/resetUsers',(req,res) => {
    const query = 'DROP TABLE IF EXISTS Users;'
    + "CREATE TABLE USERS (user_id INT, first_name VARCHAR(255), last_name VARCHAR(255), email VARCHAR(255), gender VARCHAR(255), username TEXT, "
    + "password VARCHAR(255), avatar_image VARCHAR(255), hex_color VARCHAR(255));"
    + "LOAD DATA LOCAL INFILE 'csv/usersTable.csv' INTO TABLE USERS FIELDS TERMINATED BY ',' IGNORE 1 LINES "
    + "(user_id, first_name, last_name, email, gender, username, password, avatar_image, hex_color);"
    executeQuery(query,res)
 })

 app.get('/resetReviews',(req,res) => {
  const query = 'DROP TABLE IF EXISTS Reviews;'
    + "CREATE TABLE Reviews (row_id INT AUTO_INCREMENT PRIMARY KEY, review VARCHAR(255), anime_id INT, user_id INT, date_time DATETIME);"
    + "LOAD DATA LOCAL INFILE 'csv/reviewsTable.csv' INTO TABLE Reviews FIELDS TERMINATED BY ',' "
    + "IGNORE 1 LINES (review, anime_id, user_id, date_time);"
  executeQuery(query,res)
})

app.get('/resetUserReviews',(req,res) => {
  const query = 'DROP TABLE IF EXISTS User_Review;'
    + "CREATE TABLE User_Review (user_id INT, review VARCHAR(255));"
    + "LOAD DATA LOCAL INFILE 'csv/userReviewTable.csv' INTO TABLE User_Review FIELDS TERMINATED BY ',' "
    + "IGNORE LINES 1 (user_id, review);" 
  
  executeQuery(query,res)
})

app.get('./allGenres', (req,res) => {
  const query = "SELECT * FROM GENRES WHERE ID != 1"
  executeQuery(query,res)
})

app.get('./largestAnimeId',(req,res) => {
  const query = "SELECT MAX(anime_id) AS largest_anime_id FROM Anime"
  executeQuery(query,res)
})

app.post('/addAnime/:name/:animeId/:type/:episodes/:rating/:members/:genres', (req,res) =>{
  
  const insertAnime = `INSERT INTO Anime (name, anime_id, type, episodes, ratings, members)
    VALUES ('${req.body.name}','${req.body.animeId}','${req.body.type}',
    ${req.body.episodes},${req.body.rating}, ${req.body.members})`

  const insertAnimeGenres = Object.keys(req.body.genres).map(key =>{
    const id = req.body.genres[keys]
    return `INSERT INTO Anime_Genre (anime_id, genre_id) VALUES '${req.body.animeId}',${id}`
  })

  const queries = [insertAnime, ...insertAnimeGenres]
  executeQuery(queries.join(';'), res)
})






app.listen(port, () => console.log(`REST API is live on port ${port}`)) // app is listening on port 4000
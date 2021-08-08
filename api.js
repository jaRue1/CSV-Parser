const express = require('express'); // imported express 
const mysql = require('mysql') // imported mysql
const cors = require('cors') // imported cors
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
app.get('/getAllAnime',(req, res) => { // get api point - pulls all data from SQL DB table ANIME
  const query = "SELECT * FROM ANIME" // sql query
  db.query(query, (err,rows) =>{
    if(err) throw err
    res.send(rows)
  })
})

app.get('/deleteAnime/:id', (req,res) => {// get api point that deletes a row from the DB
  const query = `DELETE FROM ANIME WHERE anime_id = ${req.params.id}`
  db.query(query, (err, rows) => {
    if (err) throw err
    res.send(rows)
  }) 
})

app.get('/resetAnime',(req,res) => {
  const query = "DROP TABLE IF EXISTS Anime;"+
    "CREATE TABLE Anime (row_id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255), anime_id INT, type VARCHAR(255), episodes INT, rating DECIMAL, members INT);" +
    "LOAD DATA LOCAL INFILE 'csv/animeTable.csv' INTO TABLE Anime FIELDS TERMINATED BY ',' IGNORE 1 LINES (name, anime_id, type, episodes, rating, members);"
    db.query(query, (err, rows) => {
      if (err) throw err
      res.send(rows)
    }) 
})

app.get('/resetAnimeGenre', (req,res) => {
  const query = "DROP TABLE IF EXISTS Anime_Genre;"
  "CREATE TABLE Anime_Genre (row_id INT AUTO_INCREMENT PRIMARY KEY, anime_id INT, genre_id INT);" +
    "LOAD DATA LOCAL INFILE 'csv/animeGenreTable.csv' INTO TABLE Anime_Genre FIELDS TERMINATED BY ',' IGNORE 1 LINES (anime_id, genre_id);"
    db.query(query, (err, rows) => {
      if (err) throw err
      res.send(rows)
    }) 
})
app.listen(port, () => console.log(`REST API is live on port ${port}`)) // app is listening on port 4000
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
})
app.use(cors())
app.get('/getAllAnime',(req, res) => { // get api point - pulls all data from SQL DB table ANIME
  const query = "SELECT * FROM ANIME" // sql query
  db.query(query, (err,rows) =>{
    if(err) throw err
    res.send(rows)
  })
})

app.listen(port, () => console.log(`REST API is live on port ${port}`)) // app is listening on port 4000
const Papa = require('papaparse')
const fs = require('fs') // importing the file system

const animeFilePath = './csv/anime.csv' // assigning the value of the file path
const animeFile = fs.readFileSync(animeFilePath, 'utf8') // reading it the csv file

const animeRows = {} // empty object that will store the rows

Papa.parse(animeFile, {
  header: true, // keep the headers in the csv
  skipEmptyLines: true, // read 
  complete: function(results) { 
    animeRows.data = results.data // assigning the data we parse to the object animeRows
    animeRows.errors = results.errors // assigning the errors we receive to the errors attribute errors
    animeRows.meta = results.meta // misc info
  }
})

// console.log(animeRows.data) this will print all the data formatted

const animeArray = animeRows.data.map(row => {
  const {name , anime_id, type, episodes, rating, members } = row // destructuring 
  const editedName = name.replace(/,/g, ' ') // take the comma's and replace them with spaces

  return {name: editedName, anime_id, type, episodes, rating, members }
})

const animeData = Papa.unparse(animeArray) // convert the animeArray to a string 


              //filePath           //data             //msg
createFile("./csv/animeTable.csv",animeData, "Anime table successfully saved.")

function createFile(FilePath, data, msg){
  fs.writeFile(FilePath,data, err =>{
    if(err) throw err
  })
  console.log(msg)
}
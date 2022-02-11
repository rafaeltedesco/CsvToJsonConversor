import express from 'express'
import 'dotenv/config'
import { readFile } from 'fs/promises'
import path from 'path'

const app = express()

app.use('/', async (req, res, next)=> {
  try {
    const csv = await readFile(global.filename, {encoding: 'utf-8'})
 
    let data = csv.split('\n')
    const header = data[0].split(',')
    const lines = data.slice(1).map(line => line.split(','))
    let jsonData = []
   
    for (let line of lines) {
      let row = {}
      for (let colIdx in header) {
        let col = header[colIdx]
        let cellValue = line[colIdx]
        row[col] = cellValue
      }
      jsonData.push(row)
    }
   res.end(JSON.stringify(jsonData))
  }
  catch(err) {
    console.error(err.message)
    throw new Error('Error reading file')
  }
  
})

global.__dirname = process.cwd()

global.filename = path.resolve(__dirname, 'src', 'database', 'udemy', 'udemy_courses.csv')

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
  console.log(`Server up and running ${PORT}`)
})

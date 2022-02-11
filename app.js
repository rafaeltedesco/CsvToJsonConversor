import express from 'express'
import 'dotenv/config'
import { createReadStream } from 'fs'
import path from 'path'

const app = express()

app.use('/', async (req, res, next)=> {
  
    const csvStream = createReadStream(global.filename, {encoding: 'utf-8'})
 
    csvStream.on('data', (chunk)=> {
      let data = chunk.split('\n')
      const header = data[0].split(',')
      const lines = data.slice(1).map(line => line.split(','))
      
      for (let line of lines) {
        let row = {}
        for (let colIdx in header) {
          let col = header[colIdx]
          let cellValue = line[colIdx]
          row[col] = cellValue
        }
       
        res.write(JSON.stringify(row))
      }
    })

    csvStream.on('end', ()=> {
      res.end()

    })

    csvStream.on('error', (err)=> {
      res.end(err.message)
    })
})

global.__dirname = process.cwd()

global.filename = path.resolve(__dirname, 'src', 'database', 'udemy', 'udemy_courses.csv')

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
  console.log(`Server up and running ${PORT}`)
})

import express from 'express'
import 'dotenv/config'

const app = express()

app.use('/', (req, res, next)=> {
  res.send({teste: 'ok'})
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
  console.log(`Server up and running ${PORT}`)
})

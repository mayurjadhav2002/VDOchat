const express = require('express')
const db = require('./db.js')
db();
const app = express()
const port = 3001
var cors = require('cors')
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => {
  res.send('hello world')
})

app.use('/app/signup',require('./signup'))
app.use('/app/login',require('./login'))

app.listen(process.env.PORT||port, () => {
  console.log(`Example app listening on port ${port}`)
})
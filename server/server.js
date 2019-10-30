const express = require('express')
const route = require('./routes/routes')
const bodyParser = require('body-parser')
const app = express()
//const cors = require('cors')

/* var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
} */

//app.use(cors(corsOptions))
app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:false}))
app.use('/', route)

app.listen(8000, () => {
  console.log('Server started!')
  
})  

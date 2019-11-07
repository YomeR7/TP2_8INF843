const express = require('express')
const route = require('./routes/routes')
const bodyParser = require('body-parser')
const session = require('express-session');
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session)
const app = express()
//const cors = require('cors')

/* var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
} */

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


//app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/', route)

app.listen(8000, () => {
  console.log('Server started!')
  
})  

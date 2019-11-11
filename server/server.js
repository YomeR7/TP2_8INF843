const express = require('express')

const bodyParser = require('body-parser')
const session = require('express-session');
const uuid = require('uuid/v4')
const FileStore = require('session-file-store')(session)
const passport = require('passport')
const cors = require('cors') 

require('./page_controller/passportConf')(passport)

const app = express()

app.use(cors())

/** 
 * Configuration du body parser
 */
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


/** 
 * Configuration des sessions
 */
app.use(session({
  genid: (req) => {
    console.log('Inside the session genid middleware')
    console.log(`Request object sessionID from client: ${req.sessionID}`)
    return uuid() // use UUIDs for session IDs
  },
  store: new FileStore({path : './sessions'}),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


/** 
 * Configuration de passport pour les authentifications
 */
app.use(passport.initialize())
app.use(passport.session())


/** 
 * Definition de la route de base de l'application
 */
const route = require('./routes/routes')(app, express, passport)
app.use('/', route)


/**
 * Lancement du serveur
 */
app.listen(8000, () => {
  console.log('Server started!')
  
})  


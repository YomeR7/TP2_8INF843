const express = require('express')
const accueil = require('../accueil.js')
const inscription = require('../inscription.js')
//const inscription = require('../inscription.js')

const route = express.Router()

route.get('/',(req,res)=>{
    //res.send("Welcome :)")
    accueil.welcome(req,res)
})

route.post('/inscription',(req,res) => inscription.validation(req,res))
module.exports = route
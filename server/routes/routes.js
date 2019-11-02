const express = require('express')
const accueil = require('../page_controller/accueil.js')
const user = require('../page_controller/users.js')
const inValid = require('../page_controller/inputValidation.js')
//const inscription = require('../inscription.js')

const route = express.Router()
/*****************************
 *   Page d'accueil
 *****************************/
route.get('/',(req,res)=>{
    //res.send("Welcome :)")
    accueil.welcome(req,res)
})

/*****************************
 *   Page d'inscription
 *****************************/
route.post('/inscription', inValid.validation(inValid.userSchema),(req,res) =>{
    user.inscription(req,res)
})

/*****************************
 *   Page d'authentification
 *****************************/
route.post('/auth', inValid.validation(inValid.userAuth), (req,res)=>{
    user.authentication(req,res);
})
module.exports = route
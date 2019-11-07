const express = require('express')
const accueil = require('../page_controller/accueil.js')
const user = require('../page_controller/users.js')
const inValid = require('../page_controller/inputValidation.js')
const bdd = require('../interaction_bdd/interact_bdd.js')
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
route.get('/inscription',(req,res)=>{
    user.inscriptionPage(req,res)
})

route.post('/inscription', inValid.validation(inValid.inscriptionSchema),(req,res) =>{
    user.inscription(req,res)
})

/*****************************
 *   Page d'authentification
 *****************************/
route.get('/auth',(req,res)=>{
    user.loginPage(req,res)
})

route.post('/auth', inValid.validation(inValid.authSchema), (req,res)=>{
    user.authentication(req,res)    
})
/*****************************
 *   Page trajet
 *****************************/
route.get('/trajet',(req,res)=>{
})

route.post('/trajet', inValid.validation(inValid.trajetSchema), (req,res)=>{

})
module.exports = route
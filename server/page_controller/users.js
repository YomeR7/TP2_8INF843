const express = require('express')
const mysql = require('../interaction_bdd/interact_bdd.js')
//const bodyParser = require('body-parser')

//const app = express()

function inscription(req, res) {

  /*   if (!mysql.inscription(req.body.login, req.body.password, req.body.nom, req.body.prenom, req.body.email, req.body.tel, req.body.prefs)) {
      console.log('erreur inscription')
    } */
  res.send(req.body)
  //database 
}


function authentication(req, res) {
var login = req.body.login
var password = req.body.login
//Check login/password dans la bdd -> fct dans interact_bdd
  //if(connection success) 
  
}

module.exports = {
  inscription,
  authentication
}


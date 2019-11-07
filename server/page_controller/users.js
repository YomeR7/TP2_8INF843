const express = require('express')
const bdd = require('../interaction_bdd/interact_bdd.js')
const passport= require('passport')
const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uuid/v4')

/* passport.use(new LocalStrategy(
    {usernameField: 'login'},
    (login, password, done)=>{
      
    }
))
 */
/** 
 * Backend de la page d'inscription
 **/
function inscriptionPage(req, res) {
  console.log(req.sessionID)
  res.send("inscription page")
}
/** 
 * Inscription d'un utilisateur
 **/
function inscription(req, res) {

  if (!bdd.inscription(req.body.login, req.body.password, req.body.nom, req.body.prenom,
    req.body.email, req.body.tel, req.body.prefs)) {
    console.log('erreur inscription')
  }

  res.send("posted inscription")

  //database 
}
/** 
 * Backend de la page de login
 **/
function loginPage(req, res) {
  console.log(req.sessionID)
  res.send("login page")
}

/** 
 * Authentification d'un utilisateur
 **/
function authentication(req, res) {
  var login = req.body.login
  var password = req.body.password

  bdd.recup_user(null, login, (result) => {
    if(result == "undefined"){
      res.send({error: "le login ou le mot de passe sont érronés1"})
      console.log(result)
    }else{
      var id = result.id_user
      bdd.test_mdp(id, password,(test)=>{
        if(test===true){
          res.send("succes")
        }else{
          res.send({error: "le login ou le mot de passe sont érronés2"})
        }
      })
    }
  })
  //Check login/password dans la bdd -> fct dans interact_bdd
  //if(connection success) 
  
}

module.exports = {
  inscription,
  authentication,
  loginPage,
  inscriptionPage
}


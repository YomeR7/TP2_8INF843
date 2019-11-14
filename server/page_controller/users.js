const bdd = require('../interaction_bdd/interact_bdd.js')


/** t
 * Inscription d'un utilisateur
 */
function inscription(req, res) {

  bdd.inscription(req.body.login, req.body.password, req.body.nom, req.body.prenom,
    req.body.email, req.body.tel, req.body.prefs, (result) => {
      console.log(result)
      if (result) {
        res.send({ message: "inscrit avec succes!" })
      } else {
        res.send({ error: result })
      }
    })
  //database 
}


/** 
 * Authentification d'un utilisateur
 */
function authentication(req, res, next, passport) {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.send({ error: "authentication failed" }) }
    req.login(user, (err) => {
      if (err) { return next(err) }
      return res.send({ message: "authetication succes" })
    })
  })(req, res, next)
}


/**
 * Information d'un utilisateur  
 */
function information(req, res) {
  id_user = req.session.passport.user //id de l'utilisateur connecté 

  bdd.recup_user(id_user, null, (result) => {
    res.send(result)
  })
}


/**
 * Historique des trajets d'un utilisateur 
 */
function historique(req, res) {
  id_user = req.session.passport.user

  bdd.histo_trajet(id_user, (result) => {
    console.log(result)
    res.send(result)
  })
}


function trajetReserve(req, res) {
  id_user = req.session.passport.user

  bdd.histo_trajet(id_user, (result) => {
    console.log(result)
    res.send(result)
  })
}

function trajetCree(req, res) {
  id_user = req.session.passport.user //id de l'utilisateur connecté 

  bdd.histo_trajet_cree(id_user, (result) => {
    console.log(result)
    res.send(result)
  })
}
function payment(req, res) {

}


module.exports = {
  inscription,
  authentication,
  information,
  trajetCree,
  trajetReserve,
  historique
}


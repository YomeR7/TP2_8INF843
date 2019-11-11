const bdd = require('../interaction_bdd/interact_bdd.js')


/** 
 * Backend de la page d'inscription
 */
function inscriptionPage(req, res) {
  console.log(req.sessionID)
  res.send("inscription page")
}


/** 
 * Inscription d'un utilisateur
 */
function inscription(req, res) {

  bdd.inscription(req.body.login, req.body.password, req.body.nom, req.body.prenom,
    req.body.email, req.body.tel, req.body.prefs, (result) => {
      console.log(result)
    })
  res.send("posted inscription")
  //database 
}


/** 
 * Backend de la page de login
 */
function loginPage(req, res) {
  console.log(req.sessionID)
  res.send("login page")
}


/** 
 * Authentification d'un utilisateur
 */
function authentication(req, res, next, passport) {
  passport.authenticate('local-login', (err, user, info) => {
    if (err) { return next(err) }
    if (!user) { return res.send({error:"authentication failed"}) }
    req.login(user, (err) => {
      if (err) { return next(err) }
      return res.send("authetication succes")
    })
  })(req, res, next)
}


module.exports = {
  inscription,
  authentication,
  loginPage,
  inscriptionPage
}


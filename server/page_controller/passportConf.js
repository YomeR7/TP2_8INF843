const LocalStrategy = require('passport-local').Strategy
const bdd = require('../interaction_bdd/interact_bdd.js')
/**
 * Configuration de la strategie d'authentification (pour passport.js)
 */
module.exports = function (passport) {

    passport.use('local-login', new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password',
        },
        (login, password, done) => {
            bdd.recup_user(null, login, (user) => {
                if (user == "undefined") {  //l'utilisateur n'existe pas
                    return done(null, false)
                } else {                    //l'utilisateur existe
                    const id = user.id_user
                    bdd.test_mdp(id, password, (test) => {
                        if (test === true) {//mdp validé 
                            console.log("mdp validé")
                            return done(null, user)
                        } else {            //mdp erroné
                            return done(null, false)
                        }
                    })
                }
            })
        }
    ))


    passport.serializeUser((user, done) => {
        console.log('Inside serializeUser callback. User id is save to the session file store here')
        done(null, user.id_user);
    })


    passport.deserializeUser((id, done) => {
        console.log('Inside deserializeUser callback')
        console.log(`The user id passport saved in the session file store is: ${id}`)
        bdd.recup_user(id, null, (user) => {
            console.log(user)
            done(null, user);
        })
    })

}


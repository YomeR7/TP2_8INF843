const accueil = require('../page_controller/accueil.js')
const users = require('../page_controller/users.js')
const inValid = require('../page_controller/inputValidation.js')
const bdd = require('../interaction_bdd/interact_bdd.js')
//const inscription = require('../inscription.js')


module.exports = function (app, express, passport) {

    const route = express.Router()


    /**
     *   Page d'accueil
     */
    route.get('/', (req, res) => {
        accueil.welcome(req, res)
    })


    /**
     *   Page d'inscription
     */
    route.get('/inscription', (req, res) => {
        users.inscriptionPage(req, res)
    })
    route.post('/inscription', inValid.validation(inValid.inscriptionSchema), (req, res) => {
        users.inscription(req, res)
    })


    /**
     *   Page d'authentification
     */
    route.get('/auth', (req, res) => {
        users.loginPage(req, res)
    })
    route.post('/auth', [inValid.validation(inValid.authSchema), (req, res, next) => {
        users.authentication(req, res, next, passport)
    }])


    /**
     *   Page trajet
     */
    route.get('/trajet/search', (req, res) => {
    })
    route.post('/trajet/post', inValid.validation(inValid.trajetSchema), (req, res) => {
        if(req.isAuthenticated()){
            res.send("you can post trajet")
            
        }else{
            res.redirect("/")
        }
    })

    return route
}
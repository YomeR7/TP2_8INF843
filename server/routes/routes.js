const accueil = require('../page_controller/accueil.js')
const users = require('../page_controller/users.js')
const trajet = require('../page_controller/trajet.js')
const inValid = require('../page_controller/inputValidation.js')
//const inscription = require('../inscription.js')


module.exports = function (app, express, passport) {

    const route = express.Router()

    /**
     *   Route d'inscription
     */
    route.get('/user/inscription', (req, res) => {
        users.inscriptionPage(req, res)
    })
    route.post('/user/inscription', inValid.validation(inValid.inscriptionSchema), (req, res) => {
        users.inscription(req, res)
    })


    /**
     *   Route d'authentification
     */
    route.get('/user/auth', (req, res) => {
        users.loginPage(req, res)
    })
    route.post('/auth', [inValid.validation(inValid.authSchema), (req, res, next) => {
        users.authentication(req, res, next, passport)
    }])


    /**
     *   Route trajet
     */
    route.post('/trajet/search', inValid.validation(inValid.findSchema),(req, res) => {
        trajet.findTrajet(req,res)
    })
    route.post('/trajet/post', inValid.validation(inValid.trajetSchema), (req, res) => {
        if(req.isAuthenticated()){
            trajet.postTrajet(req,res)
        }else{
            res.send({error:"not connected"})
        }
    })
    route.post('/trajet/reserve', (req,res)=>{
        if(req.isAuthenticated()){

        }else{
            res.send({error:"not connected"})
        }
    })

    /**
     * Route utilisateur
     */
    route.get('/user/information', (req,res)=>{
        if(req.isAuthenticated()){
            users.information(req,res)
        }else{
            res.send({error:"not connected"})
        }
    })

    route.get('/user/historique', (req,res)=>{
        if(req.isAuthenticated()){
            users.historique(req,res)
        }else{
            res.send({error:"not connected"})
        }
    })


    return route
}
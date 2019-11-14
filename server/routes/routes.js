const users = require('../page_controller/users.js')
const trajet = require('../page_controller/trajet.js')
const inValid = require('../page_controller/inputValidation.js')
//const inscription = require('../inscription.js')


module.exports = function (express, passport) {

    const route = express.Router()

    /**
     *   Route d'inscription
     */
    route.post('/user/inscription', inValid.validation(inValid.inscriptionSchema), (req, res) => {
        users.inscription(req, res)
    })


    /**
     *   Route d'authentification
     */
    route.post('/auth', [inValid.validation(inValid.authSchema), (req, res, next) => {
        users.authentication(req, res, next, passport)
    }])


    /**
     *   Route trajet
     */
    route.post('/trajet/search', inValid.validation(inValid.findSchema), (req, res) => {
        trajet.findTrajet(req, res)
    })

    route.post('/trajet/post', inValid.validation(inValid.trajetSchema), (req, res) => {
        if (req.isAuthenticated()) {
            trajet.postTrajet(req, res)
        } else {
            res.send({ error: "not connected" })
        }
    })

    route.post('/trajet/reserve', inValid.validation(inValid.reservationSchema), (req, res) => {
        if (req.isAuthenticated()) {
            trajet.reserveTrajet(req, res)
        } else {
            res.send({ error: "not connected" })
        }
    })

    route.post('    ', inValid.validation(inValid.supprSchema), (req, res) => {
        if (req.isAuthenticated()) {
            trajet.deleteTrajet(req, res)
        } else {
            res.send({ error: "not connected" })
        }
    })


    /**
     * Route utilisateur
     */
    route.post('/user/information', (req, res) => {
        if (req.isAuthenticated()) {
            users.information(req, res)
        } else {
            res.send({ error: "not connected" })
        }
    })

    route.post('/user/historique', (req, res) => {
        if (req.isAuthenticated()) {
            users.historique(req, res)
        } else {
            res.send({ error: "not connected" })
        }
    })


    route.post('/user/trajetReserve', (req, res) => {
        if (req.isAuthenticated()) {
            users.trajetReserve(req, res)
        } else {
            res.send({ error: "not connected" })
        }
    })

    route.post('/user/trajetConducteur', (req, res) => {
        if (req.isAuthenticated()) {
            users.trajetCree(req, res)
        } else {
            res.send({ error: "not connected" })
        }
    })

    route.post('/user/logout', (req, res) => {
        if (req.isAuthenticated()) {
            req.logout()
            res.send({ message: "l'utilisateur est deconnecté" })
        } else {
            res.send({ error: "not connected" })
        }
    })


    return route
}
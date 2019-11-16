const bdd = require('../interaction_bdd/interact_bdd.js')

/**
 * Fonction pour créer un trajet
 */
function postTrajet(req, res) {
    var idConducteur = req.session.passport.user //Id de l'utilisateur connecté
    var date = req.body.date
    var lieuDepart = req.body.lieuDepart
    var lieuArrivee = req.body.lieuArrivee
    var h_dep = req.body.hDepart
    var h_arr = req.body.hArrive
    var nb_place_tot = req.body.nbPlace
    bdd.creation_trajet(idConducteur, date, lieuDepart, lieuArrivee, h_dep, h_arr, nb_place_tot, (result) => {
        console.log(result)
        res.send(result)
    })
}


/**
 * Fonction pour trouver un trajet
 */
function findTrajet(req, res) {
    var lieu_dep = req.body.lieuDepart
    var lieu_arr = req.body.lieuArrivee
    var h_dep
    var date = req.body.date
    var nb_place = req.body.nbPlace
    if (req.body.hDepart === undefined) {
        h_dep = "00:00:00"
    } else {
        h_dep = req.body.hDepart
    }
    bdd.recherche_trajet(lieu_dep, lieu_arr, h_dep, date, nb_place, (result) => {
        console.log(result)
        res.send(result)
    })
}


/**
 * Fonction pour reserver un trajet
 */
function reserveTrajet(req, res) {
    idUser = req.session.passport.user
    idTrajet = req.body.idTrajet
    nbPlace = req.body.nbPlace

    bdd.reservation(idUser, idTrajet, nbPlace, (result) => {
        res.send(result)
    })
}


function deleteTrajet(req, res){
    idTrajet = req.body.idTrajet

    bdd.suppr_trajet(idTrajet,(result)=>{
        console.log(result)
        res.send(result)
    })
}


module.exports = {
    postTrajet,
    findTrajet,
    reserveTrajet,
    deleteTrajet
}
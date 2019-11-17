const bdd = require('../interaction_bdd/interact_bdd.js')

/**
 * Fonction pour créer un trajet
 */
function postTrajet(req, res) {
    var idConducteur = req.session.passport.user //Id de l'utilisateur connecté
    var date = req.body.date
    var lieuDepart = req.body.lieuDepart
    var lieuArrivee = req.body.lieuArrivee
    var hDepart = req.body.hDepart
    var hArrive = req.body.hArrive
    var nbPlaceTot = req.body.nbPlace
    bdd.creation_trajet(idConducteur, date, lieuDepart, lieuArrivee, hDepart, hArrive, nbPlaceTot, (result) => {
        res.send({message:result})
    })
}


/**
 * Fonction pour trouver un trajet
 */
function findTrajet(req, res) {
    var lieuDepart = req.body.lieuDepart
    var lieuArrivee = req.body.lieuArrivee
    var hDepart
    var date = req.body.date
    var nbPlace = req.body.nbPlace
    if (req.body.hDepart === undefined) {
        hDepart = "00:00:00"
    } else {
        hDepart = req.body.hDepart
    }
    bdd.recherche_trajet(lieuDepart, lieuArrivee, hDepart, date, nbPlace, (results) => {
        if(results[0]){
            res.send(results)
        }else{
            res.send({message:"Aucun trajets trouvés"})
        }
        
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
        if (result===true) {
            bdd.recup_trajet_reservations(idTrajet,(trajet)=>{
                res.send({
                    message: "trajet reservé avec succes",
                    trajet: trajet
                })
            })
        }else{
            res.send({message:result})
        }
    })
}


function deleteTrajet(req, res) {
    idTrajet = req.body.idTrajet

    bdd.suppr_trajet(idTrajet, (result) => {
        res.send({message:result})
    })
}


module.exports = {
    postTrajet,
    findTrajet,
    reserveTrajet,
    deleteTrajet
}
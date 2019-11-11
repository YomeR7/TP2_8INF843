const bdd = require('../interaction_bdd/interact_bdd.js')


function postTrajet(req, res) {
    res.send("youhou")
    var idConducteur = req.session.passport.user //Id de l'utilisateur connecté
    console.log(idConducteur)
    var date = req.body.date
    console.log(date)
    var lieuDepart = req.body.lieuDepart
    console.log(lieuDepart)
    var lieuArrivee = req.body.lieuArrivee
    console.log(lieuArrivee)
    var h_dep = req.body.hDepart
    console.log(h_dep)
    var h_arr = req.body.hArrive
    console.log(h_arr)
    var nb_place_tot = req.body.nbPlace
    console.log(nb_place_tot)
    bdd.creation_trajet(idConducteur, date, lieuDepart, lieuArrivee, h_dep, h_arr, nb_place_tot, (result) => {
        console.log(result)
    })
}

function findTrajet(req, res) {
    res.send("youhou")
    bdd.recherche_trajet()
}

module.exports = {
    postTrajet,
    findTrajet
}
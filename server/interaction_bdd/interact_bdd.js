
const CONFIG=require('./config.js');

/*--------------------------------------

# --- USER ---

	// Fonction de test de l'existence d'un usager
		function user_exist(id_user=null, login=null, nom=null, prenom=null, email=null, callback=null);
		// Exemple :
			user_exist(2, "Baba", null, null, function(validation_totale, validation_partielle){
				console.log("Validation totale : "+validation_totale);
				console.log("Validation partielle : "+validation_partielle);
			});

	// Fonction d'inscription
		id_user inscription(login, mdp, nom, prenom, email, tel=null, prefs=null, callback=null);
		// Exemple :
			inscription("Baeea", "bobo", "bibi", "bebe", "babeea@bubu.r", null, null, function(id_user){
				console.log(id_user);
			});


	// Fonction de récupération des données d'un utilisateur
		function recup_user(id_user, callback=null);
		// Exemple :
			recup_user(3,function(tab){
				console.log(tab.login);
			});


# --- TRAJET ---

	// Fonction de création d'un trajet
		creation_trajet(id_conducteur, date, lieu_dep, lieu_arr, h_dep, h_arr, nb_places_tot, callback=null);
		// Exemple :
			creation_trajet(id_user, "2012-10-25", "Paris", "Limoges", "16:00", "20:00", 3, function(id_trajet){
				console.log(id_trajet);
			});


	// Fonction de suppression d'un trajet
		function suppr_trajet(id_trajet, callback=null);
		// Exemple :
			suppr_trajet(3, function(){
				console.log("Callback");
			});


	// Fonction de recherche d'un trajet
		function recherche_trajet(lieu_dep, lieu_arr, h_dep, date="NOW()", nb_perso=null, callback=null);
		// Exemple :
			recherche_trajet("lieu_dep", "lieu_arr", 5, "2012-12-24", 2, function(resultats){
				console.log(resultats);
			});

	// Fonction de reservation d'un trajet
		function reservation(id_user, id_trajet, nb_places, callback=null);
		// Exemple :
			reservation(1, id_trajet, 1);


	// Fonction de listage de l'historique des trajets de l'utilisateur
		function histo_trajet(id_user, callback=null);
		// Exemple
			histo_trajet(1, function(result){
				console.log(result);
			});


--------------------------------------*/


function user_exist(id_user=null, login=null, nom=null, prenom=null, email=null, callback=null){
	var NUM_FONC=CONFIG.id_fonction();

	if(id_user==null&&login==null&&(nom==null||prenom==null)){
		console.log("Un paramètre n'est pas défini (fonction user_exist) !");
		return false;
	}
	CONFIG.connexion(NUM_FONC);

	var condition1, condition2;
	if(id_user!=null){
		condition1='u1.`id_user`='+id_user;
		condition2='u2.`id_user`='+id_user;
		if(login!=null){
			condition2+=' OR u2.`login`="'+login+'"';
			condition1+=' AND u1.`login`="'+login+'"';
		}
		if(nom!=null&&prenom!=null){
			condition2+=' OR (u2.`nom`="'+nom+'" AND u2.`prenom`="'+prenom+'")';
			condition1+=' AND u1.`nom`="'+nom+'" AND u1.`prenom`="'+prenom+'"';
		}
		if(email!=null){
			condition2+=' OR u2.`email`="'+email+'"';
			condition1+=' AND u1.`email`="'+email+'"';
		}
	}else if(login!=null){
		condition1='`login`="'+login+'"';
		condition2='u2.`login`="'+login+'"';
		if(nom!=null&&prenom!=null){
			condition2+=' OR (u2.`nom`="'+nom+'" AND u2.`prenom`="'+prenom+'")';
			condition1+=' AND u1.`nom`="'+nom+'" AND u1.`prenom`="'+prenom+'"';
		}
		if(email!=null){
			condition2+=' OR u2.`email`="'+email+'"';
			condition1+=' AND u1.`email`="'+email+'"';
		}
	}else if(nom!=null&&prenom!=null){
		condition1='u1.`nom`="'+nom+'" AND u1.`prenom`="'+prenom+'"';
		condition2='u2.`nom`="'+nom+'" AND u2.`prenom`="'+prenom+'"';
		if(email!=null){
			condition2+=' OR u2.`email`="'+email+'"';
			condition1+=' AND u1.`email`="'+email+'"';
		}
	}else{
		condition2+='u2.`email`="'+email+'"';
		condition1+='u1.`email`="'+email+'"';
	}

	var requete=CONFIG.bdd.query('SELECT IF((SELECT SUM(u1.`id_user`) FROM `user` u1 WHERE '+condition1+')>0, 1, 0)+IF((SELECT SUM(u2.`id_user`) FROM `user` u2 WHERE '+condition2+')>0, 1, 0) "tot"',
		function (err, result) {
		    if(!err){
		    	if(result.length==0)return false;

			    if(callback!=null)callback((result[0].tot==2), (result[0].tot>0));
			    CONFIG.deconnexion(NUM_FONC);
			    return true;
			}else{
				console.log(err);
				CONFIG.deconnexion(NUM_FONC);
				return false;
			}
	 	});

}


function inscription(login, mdp, nom, prenom, email, tel=null, prefs=null, callback=null){
	var NUM_FONC=CONFIG.id_fonction();

	if(login==undefined||mdp==undefined||nom==undefined||prenom==undefined||email==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction inscription) !");
		return false;
	}

	user_exist(null, login, nom, prenom, email, function(tot, part){
		if(!part){

			CONFIG.connexion(NUM_FONC);

			sql='INSERT INTO `USER` (`login`, `mdp`, `nom`, `prenom`, `email`, `tel`, `prefs`) VALUES ("'+login+'", "'+mdp+'", "'+nom+'", "'+prenom+'", "'+email+'"';
	    	if(tel!=null)sql+=',"'+tel+'"';
	    	else sql+=',NULL';
	    	if(prefs!=null)sql+=',"'+prefs+'"';
	    	else sql+=',NULL';
	    	sql+=')';

	    	var requete=CONFIG.bdd.query(sql,
				function (err2, result2) {
				    if(!err2){
					    id_user=result2.insertId;
					    if(callback!=null)callback(id_user);
					    CONFIG.deconnexion(NUM_FONC);
						return id_user;
					}else{
						console.log(err2);
						CONFIG.deconnexion(NUM_FONC);
						return false;
					}
			 	});

		}else{
			console.log('Compte, Nom-Prénom ou adresse email déjà existant !');
			CONFIG.deconnexion(NUM_FONC);
		}
	});

}

function recup_user(id_user, callback=null){
	var NUM_FONC=CONFIG.id_fonction();

	if(id_user==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction recup_user) !");
		return false;
	}

	CONFIG.connexion(NUM_FONC);

	var requete=(CONFIG.bdd.query('SELECT `login`, `nom`, `prenom`, `email`, `tel`, `prefs` FROM `user` WHERE `id_user`='+id_user,
		function (err, result) {
		    if(!err){

		    	if(callback!=null)callback(result[0]);
		    	CONFIG.deconnexion(NUM_FONC);
		    	return result[0];
			    
			}else{
				console.log(err);
				CONFIG.deconnexion(NUM_FONC);
				return false;
			}
	
	 	}));
}

function creation_trajet(id_conducteur, date, lieu_dep, lieu_arr, h_dep, h_arr, nb_places_tot, callback=null){
	var NUM_FONC=CONFIG.id_fonction();

	if(id_conducteur==undefined||date==undefined||lieu_dep==undefined||lieu_arr==undefined||h_dep==undefined||h_arr==undefined||nb_places_tot==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction creation_trajet) !");
		return false;
	}

	CONFIG.connexion(NUM_FONC);

	var requete=(CONFIG.bdd.query('SELECT `id_trajet` FROM `trajet` WHERE `id_conducteur`='+id_conducteur+' AND `date`="'+date+'" AND ((`h_dep`<"'+h_dep+'" AND `h_arr`>"'+h_dep+'") OR (`h_dep`<"'+h_arr+'" AND `h_arr`>"'+h_arr+'"))',
		function (err, result) {
		    if(!err){

			    if(result.length==0){

			    	var requete=CONFIG.bdd.query('INSERT INTO `TRAJET` (`id_conducteur`, `date`, `lieu_dep`, `lieu_arr`, `h_dep`, `h_arr`, `nb_places_tot`) VALUES ('+id_conducteur+', "'+date+'", "'+lieu_dep+'", "'+lieu_arr+'", "'+h_dep+'", "'+h_arr+'", '+nb_places_tot+')',
						function (err2, result2) {
						    if(!err2){
							    id_trajet=result2.insertId;
							    console.log("Trajet ("+id_trajet+") cree !");
							    if(callback!=null)callback(id_trajet);
							    CONFIG.deconnexion(NUM_FONC);
								return id_trajet;
							}else{
								console.log(err2);
								CONFIG.deconnexion(NUM_FONC);
								return false;
							}
					 	});

			    }else{
			    	console.log('Conflit dans la base de données ! (Possibilité d\'existence d\'un meme trajet)');
			    	CONFIG.deconnexion(NUM_FONC);
					return false;
			    }
			}else{
				console.log(err);
				CONFIG.deconnexion(NUM_FONC);
				return false;
			}
	
	 	}));
}

function suppr_trajet(id_trajet, callback=null){
	var NUM_FONC=CONFIG.id_fonction();

	if(id_trajet==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction suppr_trajet) !");
		return false;
	}

	CONFIG.connexion(NUM_FONC);

	var requete=CONFIG.bdd.query('DELETE FROM `TRAJET` WHERE `id_trajet`='+id_trajet,
		function (err, result) {
		    if(!err){
		    	console.log("Trajet supprime !");
			    if(callback!=null)callback(id_trajet);
			    CONFIG.deconnexion(NUM_FONC);
			}else{
				console.log(err);
				CONFIG.deconnexion(NUM_FONC);
				return false;
			}
	 	});

}

function recherche_trajet(lieu_dep, lieu_arr, h_dep, date="NOW()", nb_perso=null, callback=null){
	var NUM_FONC=CONFIG.id_fonction();

	if(lieu_dep==undefined||lieu_arr==undefined||h_dep==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction recherche_trajet) !");
		return false;
	}
	CONFIG.connexion(NUM_FONC);

	var requete=CONFIG.bdd.query('SELECT `trajet`.`id_trajet`,`trajet`.`id_conducteur`,`trajet`.`date`,`trajet`.`lieu_dep`,`trajet`.`lieu_arr`,`trajet`.`h_dep`,`trajet`.`h_arr`,`reservation`.`nb_place`,`trajet`.`nb_places_tot`-SUM(`reservation`.`nb_place`) nb_places_tot FROM `trajet` JOIN `user` ON `user`.`id_user`=`trajet`.`id_conducteur` JOIN `reservation` ON `trajet`.`id_trajet`=`reservation`.`id_trajet` WHERE `trajet`.`date`="'+date+'" AND `trajet`.`h_dep`>'+h_dep+' AND `trajet`.`lieu_dep`="'+lieu_dep+'" AND `trajet`.`lieu_arr`="'+lieu_arr+'" AND `trajet`.`nb_places_tot`>='+nb_perso+' GROUP BY `trajet`.`id_trajet`',
		function (err, result) {
		    if(!err){
			    if(callback!=null)callback(result);
			    CONFIG.deconnexion(NUM_FONC);
			}else{
				console.log(err);
				CONFIG.deconnexion(NUM_FONC);
				return false;
			}
	 	});

}


function reservation(id_user, id_trajet, nb_places, callback=null){
	var NUM_FONC=CONFIG.id_fonction();

	if(id_user==undefined||id_trajet==undefined||nb_places==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction reservation) !");
		return false;
	}
	CONFIG.connexion(NUM_FONC);

	var requete=(CONFIG.bdd.query('SELECT t1.`nb_places_tot`-COALESCE((SELECT SUM(`reservation`.`nb_place`) FROM `reservation` WHERE `reservation`.`id_trajet`='+id_trajet+'),0) nb_places_dispo FROM `trajet` t1 WHERE t1.`id_trajet`='+id_trajet,
		function (err, result) {
		    if(!err){

			    if(result.length!=0){
			    	if(result[0].nb_places_dispo>=nb_places){

				    	var requete=CONFIG.bdd.query('INSERT INTO `reservation` (`id_user`, `id_trajet`, `nb_place`, `etape_dep`, `etape_arr`) VALUES ('+id_user+','+id_trajet+','+nb_places+',NULL, NULL)',
							function (err2, result2) {
							    if(!err2){
							    	console.log("Reservation effectuee !");
								    if(callback!=null)callback();
								    CONFIG.deconnexion(NUM_FONC);
									return true;
								}else{
									console.log(err2);
									CONFIG.deconnexion(NUM_FONC);
									return false;
								}
						 	});

				    }else{
				    	console.log('Nombre de place maximum de reservation atteint !');
				    	CONFIG.deconnexion(NUM_FONC);
						return false;
				    }

			    }else{
			    	console.log('Impossible de trouver le trajet !');
			    	CONFIG.deconnexion(NUM_FONC);
					return false;
			    }
			}else{
				console.log(err);
				CONFIG.deconnexion(NUM_FONC);
				return false;
			}
	
	 	}));
}


function histo_trajet(id_user, callback=null){
	var NUM_FONC=CONFIG.id_fonction();

	if(id_user==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction histo_trajet) !");
		return false;
	}
	CONFIG.connexion(NUM_FONC);

	var requete=CONFIG.bdd.query('SELECT r1.`id_trajet`, r1.`nb_place`, t1.`id_conducteur`, t1.`date`, t1.`h_dep`, t1.`h_arr`, t1.`lieu_dep`, t1.`lieu_arr`, u1.`login`, u1.`nom`, u1.`prenom` FROM `reservation` r1 JOIN `trajet` t1 ON t1.`id_trajet`=r1.`id_trajet` LEFT JOIN `user` u1 ON u1.`id_user`=t1.`id_conducteur` WHERE r1.`id_user`='+id_user,
		function (err, result) {
		    if(!err){
			    if(callback!=null)callback(result);
			    CONFIG.deconnexion(NUM_FONC);
			}else{
				console.log(err);
				CONFIG.deconnexion(NUM_FONC);
				return false;
			}
	 	});

}


module.exports = {
	user_exist,
	inscription,
	recup_user,
	creation_trajet,
	suppr_trajet,
	recherche_trajet
}
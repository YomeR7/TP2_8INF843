
const CONFIG=require('./config.js');

/*--------------------------------------

	// Fonction d'inscription
		id_user inscription(login, mdp, nom, prenom, email, tel=null, prefs=null, callback=null);
		//Exemple :
			inscription("Baeea", "bobo", "bibi", "bebe", "babeea@bubu.r", null, null, function(id_user){
				console.log(id_user);
			});


	// Fonction de récupération des données d'un utilisateur
		function recup_user(id_user, callback=null);
		//Exemple :
			recup_user(3,function(tab){
				console.log(tab.login);
			});


	// Fonction de création d'un trajet
		creation_trajet(id_conducteur, date, lieu_dep, lieu_arr, h_dep, h_arr, nb_places_tot, callback=null);
		//Exemple :
			creation_trajet(id_user, "2012-10-25", "Paris", "Limoges", "16:00", "20:00", 3, function(id_trajet){
				console.log(id_trajet);
			});


	// Fonction de suppression d'un trajet
		function suppr_trajet(id_trajet, callback=null);
		//Exemple :
			suppr_trajet(3, function(){
				console.log("Callback");
			});


--------------------------------------*/



function inscription(login, mdp, nom, prenom, email, tel=null, prefs=null, callback=null){
	var NUM_FONC=1;

	if(login==undefined||mdp==undefined||nom==undefined||prenom==undefined||email==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction inscription) !");
		return false;
	}

	CONFIG.connexion(NUM_FONC);

	var sql;
	var id_user;

	var requete=(CONFIG.bdd.query('SELECT `id_user` FROM `USER` WHERE `login`="'+login+'" OR `email`="'+email+'"',
		function (err, result) {
		    if(!err){

			    if(result.length==0){

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
								return false;
							}
					 	});

			    }else{
			    	console.log('Compte ou adresse email déjà existant !');
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

function recup_user(id_user, callback=null){
	var NUM_FONC=2;

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
	var NUM_FONC=3;

	if(id_conducteur==undefined||date==undefined||lieu_dep==undefined||lieu_arr==undefined||h_dep==undefined||h_arr==undefined||nb_places_tot==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction inscription) !");
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
	var NUM_FONC=4;

	if(id_trajet==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction recup_user) !");
		return false;
	}

	CONFIG.connexion(NUM_FONC);

	var requete=CONFIG.bdd.query('DELETE FROM `TRAJET` WHERE `id_trajet`='+id_trajet,
		function (err, result) {
		    if(!err){
		    	console.log(result);
			    if(callback!=null)callback(id_trajet);
			    CONFIG.deconnexion(NUM_FONC);
			}else{
				console.log(err);
				CONFIG.deconnexion(NUM_FONC);
				return false;
			}
	 	});

}

module.exports = {
	inscription,
	recup_user,
	creation_trajet,
	suppr_trajet
}

//const REGEX=require('regex');

const CONFIG=require('./config.js');

/*--------------------------------------

	// Fonction d'inscription (Avec fonction callback... utile ?)
		id_user inscription(login, mdp, nom, prenom, email, tel=null, prefs=null, callback=null)



	// Fonction de récupération des données d'un utilisateur
		function recup_user(id_user, callback=null)
		//Exemple :
			recup_user(3,function(tab){
				console.log(tab.login);
			});



--------------------------------------*/



function inscription(login, mdp, nom, prenom, email, tel=null, prefs=null, callback=null){

	if(login==undefined||mdp==undefined||nom==undefined||prenom==undefined||email==undefined){
		console.log("Un paramètre obligatoire n'est pas défini (fonction inscription) !");
		return false;
	}

	if(!CONFIG.connexion())return false;

	/*REGEX ne fonctionnent pas...*/

		/*var regex_login=new REGEX(/^[a-zA-Z0-9]+$/);
		var regex_email=new REGEX(/[a-zA-Z0-9\._\-]+@[a-zA-Z0-9\._\-]+\.[a-zA-Z]/);

		var regex_alpha=new REGEX(/[a-zA-Z]+/);
		var regex_tel=new REGEX(/\+{0,1}[0-9]{9-12}/);

		var regex_prefs=new REGEX(/[a-zA-Z0-9,\.\-_\+éèê\(\)\ ]+/);

		if(regex_login.test(login))console.log("login OK");
		if(regex_alpha.test(nom))console.log("nom OK");
		if(regex_alpha.test(prenom))console.log("prenom OK");
		if(regex_email.test(email))console.log("email OK");
		if(tel!=null&&regex_tel.test(tel))console.log("tel OK");
		if(prefs!=null&&regex_prefs.test(prefs))console.log("prefs OK");*/

	/*---*/

	var sql;
	var id_user;
	var etat=true;

	var requete=(CONFIG.bdd.query('SELECT `id_user` FROM `USER` WHERE `login`="'+login+'" OR `email`="'+email+'"',
		function (err, result) {
		    if(!err){

		    	console.log(result);

			    if(result.length==0){

			    	sql='INSERT `USER` (`login`, `mdp`, `nom`, `prenom`, `email`, `tel`, `prefs`) VALUES ("'+login+'", "'+mdp+'", "'+nom+'", "'+prenom+'", "'+email+'"';
			    	if(tel!=null)sql+=',"'+tel+'"';
			    	else sql+=',NULL';
			    	if(prefs!=null)sql+=',"'+prefs+'"';
			    	else sql+=',NULL';
			    	sql+=')';

			    	var requete=CONFIG.bdd.query(sql,
						function (err2, result2) {
						    if(!err2){
							    id_user=result2.insertId;
							}else{
								console.log(err2);
								etat=false;
							}

							CONFIG.deconnexion();
							if(etat){
								if(callback!=null)callback(id_user);
								return id_user;
							}
							return false;
					 	});

			    }else{
			    	console.log('Compte ou adresse email déjà existant !');
			    	CONFIG.deconnexion();
					return false;
			    }
			}else{
				console.log(err);
				CONFIG.deconnexion();
				return false;
			}
	
	 	}));
}


function recup_user(id_user, callback=null){

	if(!CONFIG.connexion())return false;

	var requete=(CONFIG.bdd.query('SELECT `login`, `nom`, `prenom`, `email`, `tel`, `prefs` FROM `user` WHERE `id_user`='+id_user,
		function (err, result) {
		    if(!err){

		    	CONFIG.deconnexion();
		    	if(callback!=null)callback(result[0]);
		    	return result[0];
			    
			}else{
				console.log(err);
				CONFIG.deconnexion();
				return false;
			}
	
	 	}));
}

module.exports = {
	inscription,
	recup_user
}
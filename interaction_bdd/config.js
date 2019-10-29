
const mysql = require('mysql');

// First you need to create a connection to the db
const bdd = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'tp2'
});

var num_fonc=0;

function connexion(num){

  if(num_fonc==0){
    console.log('Connexion à la base de données...');
    bdd.connect((err) => {
      if(err){
        console.log('Erreur de connexion à la base de données !');
      }else{
        num_fonc=num;
        console.log('Connexion à la base de données réussie !');
      }
    });
  }else{
    num_fonc=num;
  }

}

function deconnexion(num){

  if(num_fonc==num&&num_fonc!=0){
    bdd.end();
    num_fonc=0;
    console.log('Déconnexion de la base de données !');
    return true;
  }
  return false;

}

module.exports = {
  bdd,
  connexion,
  deconnexion
};
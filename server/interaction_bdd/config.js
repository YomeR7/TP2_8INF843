
const mysql = require('mysql');

// First you need to create a connection to the db
const bdd = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'tp2'
});

var ID_FONC=0;
var NUM_FONC=new Set();

function connexion(num){

  if(NUM_FONC.size==0){
    console.log('Connexion à la base de données...');
    bdd.connect((err) => {
      if(err){
        console.log('Erreur de connexion à la base de données !');
      }else{
        NUM_FONC.add(num);
        console.log('Connexion à la base de données réussie !');
      }
    });
  }else{
    NUM_FONC.add(num);
  }

}

function deconnexion(num){

  NUM_FONC.delete(num);

  if(NUM_FONC.size==0){
    bdd.end();
    console.log('Déconnexion de la base de données !');
    return true;
  }
  return false;

}

function id_fonction(){ return ID_FONC=ID_FONC+1; }

module.exports = {
  bdd,
  connexion,
  deconnexion,
  id_fonction
};
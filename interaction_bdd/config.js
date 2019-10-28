
const mysql = require('mysql');

// First you need to create a connection to the db
const bdd = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: '',
  database: 'tp2'
});

function connexion(){

  bdd.connect((err) => {
    if(err){
      console.log('Erreur de connexion à la base de données !');
      return false;
    }
  });

  console.log('Connexion à la base de données réussie !');
  return true;
}

function deconnexion(){

  bdd.end();
  console.log('Deconnexion à la base de données !');
  return true;

}

module.exports = {
  bdd,
  connexion,
  deconnexion
};
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})


export class UserService {

  id = -1;
  login = '';
  password = '';
  nom = '';
  prenom = '';
  email = '';
  tel = '';
  prefs = '';
  trajetHistorique = [];
  trajetReserve = [];
  trajetPropose = [];


  constructor(private http: HttpClient, private router:Router) { }

  setId(id) {
    this.id = id;
  }

  setLogin(login) {
    this.login = login;
  }

  setNom(nom) {
    this.nom = nom;
  }

  setPrenom(prenom) {
    this.prenom = prenom;
  }

  setEmail(email) {
    this.email = email;
  }

  setTel(tel) {
    this.tel = tel;
  }

  setPrefs(prefs) {
    this.prefs = prefs;
  }

  setTrajetHistorique(trajetHistorique) {
    this.trajetHistorique = trajetHistorique;
  }

  setTrajetReserve(trajetReserve) {
    this.trajetReserve = trajetReserve;
  }

  getId() {
    return this.id;
  }

  getLogin() {
    return this.login;
  }

  getNom() {
    return this.nom;
  }

  getPrenom() {
    return this.prenom;
  }

  getEmail() {
    return this.email;
  }

  getTel() {
    return this.tel;
  }

  getPrefs() {
    return this.prefs;
  }

  getTrajetHistorique() {
    return this.trajetHistorique;
  }

  getTrajetReserve() {
    return this.trajetReserve;
  }

  userDeconnexion() {
    this.id = -1;
    this.login = '';
    this.password = '';
    this.nom = '';
    this.prenom = '';
    this.email = '';
    this.tel = '';
    this.prefs = '';
    this.trajetPropose = [];
    this.trajetReserve = [];

    return this.http.post('http://127.0.0.1:8000/user/logout ', "oui",{withCredentials:true})
      .subscribe((val) => {
        var JSONval = JSON.parse(JSON.stringify(val));
        if (JSONval.message === "l'utilisateur est deconnecté") {
          alert("Deconnexion réussi")
        }
        else {
          alert("Erreur de déconnexion")
        }
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });

  }

  userConnexion(connexionObj) {
    return this.http.post('http://127.0.0.1:8000/auth', connexionObj,{withCredentials:true})
      .subscribe((val) => {
        var JSONval = JSON.parse(JSON.stringify(val));
        if (JSONval.message === "authentication succes") {
          this.id = 10;
          this.login = connexionObj.login;
          this.router.navigateByUrl('/')
        }
        else {
          alert("Erreur de connexion")
        }
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  userInscription(inscriptionObj) {
    return this.http.post('http://127.0.0.1:8000/user/inscription', inscriptionObj,{withCredentials:true})
      .subscribe((val) => {
        var JSONval = JSON.parse(JSON.stringify(val));
        if (JSONval.message === "inscrit avec succes!") {
          alert("Inscrit avec succes!")
          this.router.navigateByUrl('/Connexion')
        }
        else {
          alert("Erreur dans l'inscription")
        }
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  userInformationHistorique() {
    this.userInformation();
    //this.userHistorique();
  }

  userInformation() {
    return this.http.post('http://127.0.0.1:8000/user/information ', "oui",{withCredentials:true})
      .subscribe((val) => {
        var JSONval = JSON.parse(JSON.stringify(val));
        this.id = JSONval.id_user;
        this.login = JSONval.login;
        this.nom = JSONval.nom;
        this.prenom = JSONval.prenom;
        this.email = JSONval.email;
        this.tel = JSONval.tel;
        this.prefs = JSONval.prefs;
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  /** 

  userHistorique(){
    return this.http.post('http://127.0.0.1:8000/user/historique  ', "oui")
      .subscribe((val) => {
        var JSONval = JSON.parse(JSON.stringify(val));
        this.trajetHistorique = JSONval.cequejereçois;
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });

  }

  **/

  userConducteur() {
    return this.http.post('http://127.0.0.1:8000/user/trajetConducteur  ', "oui",{withCredentials:true})
      .subscribe((val) => {
        var JSONval = JSON.parse(JSON.stringify(val));
        this.trajetPropose = JSONval;
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  userReserve(){
  return this.http.post('http://127.0.0.1:8000/user/trajetReserve  ', "oui",{withCredentials:true})
    .subscribe((val) => {
      var JSONval = JSON.parse(JSON.stringify(val));
      this.trajetReserve = JSONval;
    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
}

userConducteurReserve() {
  this.userConducteur();
  this.userReserve();
}


}



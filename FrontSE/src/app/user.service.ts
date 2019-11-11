import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  id = 10;
  login = 'Jean';
  password = 'MOMO';
  nom = 'MASSAAD';
  prenom = 'Patrick';
  email = 'patmassaad@hotmail.com';
  tel = '0649623275';
  prefs = 'Pas de chien lol';
  trajetHistorique = ['oui'];
  trajetReserve = [];


  constructor(private http: HttpClient) { }

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
    this.trajetHistorique = [];
    this.trajetReserve = [];

  }

  userReset() {
    this.id = 10;
    this.login = 'PatouMata';
    this.password = 'BItch';
    this.nom = 'Jean';
    this.prenom = 'Marie';
    this.email = 'hihi@email.com';
    this.tel = '0645789612';
    this.prefs = 'Pas de chat';
    this.trajetHistorique = ['J suis deja aller la '];
    this.trajetReserve = [' J suis ap aller la bas'];
  }

  userConnexion(connexionObj) {
    return this.http.post('http://127.0.0.1:8000/auth', connexionObj)
      .subscribe((val) => {
        console.log("POST call successful value returned in body",
          val);
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
  }

  getUserfromDBN() {

  }








}



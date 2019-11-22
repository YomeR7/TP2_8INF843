import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  trajetRecherche = [];

  constructor(private http: HttpClient) { }

  recherche(RechercheObj){
    return this.http.post('http://127.0.0.1:8000/trajet/search', RechercheObj)
      .subscribe((val) => {
        this.trajetRecherche= JSON.parse(JSON.stringify(val));
      },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });

  }

  reservationTrajet(id){
    console.log(id);
    alert("Reservation effectué !")
  }


  supprimerTrajet(idTrajet){
    return this.http.post('http://127.0.0.1:8000/trajet/delete', idTrajet)
    .subscribe((val) => {
      var JSONval =JSON.parse(JSON.stringify(val));
      if (JSONval.message === "Trajet supprime!"){
        alert("Trajet supprimé");
      }
      else {
        alert("Erreur ! Veuillez réessayer.");
      }
    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }


  postTrajet(trajetObj){
    return this.http.post('http://127.0.0.1:8000/trajet/post', trajetObj)
    .subscribe((val) => {
      var JSONval =JSON.parse(JSON.stringify(val));
      if (JSONval.message !== "bdd error"){
        alert("Trajet créé");
      }
      else {
        alert("Erreur ! Veuillez réessayer.");
      }
    },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      });
  }

}


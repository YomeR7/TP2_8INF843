import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  trajetRecherche = [];

  constructor(private http: HttpClient, private router:Router) { }

  recherche(RechercheObj){
    return this.http.post('http://127.0.0.1:8000/trajet/search', RechercheObj,{withCredentials:true})
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

  reservationTrajet(idTrajet){
    return this.http.post('http://127.0.0.1:8000/trajet/reserve', {"idTrajet" : idTrajet },{withCredentials:true})
    .subscribe((val) => {
      var JSONval =JSON.parse(JSON.stringify(val));
      if (JSONval.message === "trajet reservé avec succes"){
        alert("Trajet reservé");
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


  supprimerTrajet(idTrajet){
    return this.http.post('http://127.0.0.1:8000/trajet/delete', {"idTrajet" : idTrajet },{withCredentials:true})
    .subscribe((val) => {
      var JSONval =JSON.parse(JSON.stringify(val));
      if (JSONval.message === "Trajet supprime!"){
        alert("Trajet supprimé");
        this.router.navigateByUrl('/Information');

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

  supprimerReservation(idTrajet){
    console.log(idTrajet);
    return this.http.post('http://127.0.0.1:8000/user/supprReservation', {"idTrajet" : idTrajet },{withCredentials:true})
    .subscribe((val) => {
      var JSONval =JSON.parse(JSON.stringify(val));
      if (JSONval.message === "Reservation supprime"){
        alert("Reservation supprimé");
        this.router.navigateByUrl('/Information');

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
    return this.http.post('http://127.0.0.1:8000/trajet/post', trajetObj,{withCredentials:true})
    .subscribe((val) => {
      var JSONval =JSON.parse(JSON.stringify(val));
      if (JSONval.message === "Trajet cree"){
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


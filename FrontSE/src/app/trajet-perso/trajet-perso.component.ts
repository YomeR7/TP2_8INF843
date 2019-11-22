import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrajetService } from '../trajet.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-trajet-perso',
  templateUrl: './trajet-perso.component.html',
  styleUrls: ['./trajet-perso.component.css']
})
export class TrajetPersoComponent implements OnInit {


  checkoutForm;


  constructor(private formBuilder: FormBuilder,private trajetService: TrajetService,private userService: UserService) {
    this.checkoutForm = this.formBuilder.group({
      date: '',
      hDepart:'',
      hArrive: '',
      lieuDepart:'',
      lieuArrivee:'',
      nbPlace:'',

    });
   }

   onSubmit(checkoutForm){
    this.trajetService.postTrajet(checkoutForm);
   }

   

  ngOnInit() {
  }

}

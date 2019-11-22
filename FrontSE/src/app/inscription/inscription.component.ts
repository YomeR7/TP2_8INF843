import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../user.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {



  checkoutForm;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService) { 
    

    this.checkoutForm = this.formBuilder.group({
      login: '',
      mdp:'',
      nom: '',
      prenom:'',
      email:'',
      tel:'',
      prefs:'',
    });
  }

  onSubmit(customerData) {
    this.userService.userInscription(customerData);
  }

  ngOnInit() {
  }

}

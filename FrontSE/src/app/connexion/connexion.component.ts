import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { UserService } from '../user.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {


  checkoutForm;
  
  constructor(private formBuilder: FormBuilder,
    private userService: UserService) {
      
    this.checkoutForm = this.formBuilder.group({
      login: '',
      password: '',
    });
  }

  onSubmit(customerData) {
    this.userService.userConnexion(customerData);

    this.checkoutForm.reset();
  }

  ngOnInit() {
  }

}

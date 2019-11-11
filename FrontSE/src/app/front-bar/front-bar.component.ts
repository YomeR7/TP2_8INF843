import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
@Component({
  selector: 'app-front-bar',
  templateUrl: './front-bar.component.html',
  styleUrls: ['./front-bar.component.css']
})
export class FrontBarComponent implements OnInit {


  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }

  deconnexion(){
    this.userService.userDeconnexion();
    console.log("Déconnecté")
  }
}

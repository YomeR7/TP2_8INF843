import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TrajetService } from '../trajet.service';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  checkoutForm;
  
  constructor(private formBuilder: FormBuilder,private trajetService : TrajetService) {
    this.checkoutForm = this.formBuilder.group({
      date: '',
      hDepart:'',
      hArrive: '',
      lieuDepart:'',
      lieuArrivee:'',
      nmPlace:'',
    });
   }

   onSubmit(checkoutForm) {
    this.trajetService.recherche(checkoutForm);
  }

  ngOnInit() {
  }

}

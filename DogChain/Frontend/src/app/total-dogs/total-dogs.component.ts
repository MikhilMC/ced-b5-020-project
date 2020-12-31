import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BreederService } from "../breeder.service";

@Component({
  selector: 'app-total-dogs',
  templateUrl: './total-dogs.component.html',
  styleUrls: ['./total-dogs.component.css']
})
export class TotalDogsComponent implements OnInit {

  breederId: Number;
  isAvailable: Boolean;
  totalDogs: any[];

  constructor(
    private _router: Router,
    private _breeder: BreederService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._breeder.getTotalDogs(this.breederId)
    .subscribe(result => {
      // console.log(result);
      if (result.hasOwnProperty('emptyArrayMsg')) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
        this.totalDogs = <any>(result['totalDogDetails']);
        console.log(this.totalDogs);
      }
    }, error => {
      console.log(error);
    });
  }

}

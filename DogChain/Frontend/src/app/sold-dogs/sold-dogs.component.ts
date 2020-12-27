import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { BreederService } from "../breeder.service";

@Component({
  selector: 'app-sold-dogs',
  templateUrl: './sold-dogs.component.html',
  styleUrls: ['./sold-dogs.component.css']
})
export class SoldDogsComponent implements OnInit {

  breederId: Number;
  isAvailable: Boolean;
  soldDogs: any[];
  soldDogIds: any[];

  constructor(
    private _router: Router,
    private _breeder: BreederService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._breeder.getSoldDogs(this.breederId)
    .subscribe(result => {
      // console.log(result);
      this.soldDogs = <any>(result['soldDogDetails']);
      this.soldDogIds = <any>(result['soldDogIds']);
      console.log(this.soldDogs)
      if (this.soldDogs.length === 0) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
      }
    });
  }

}

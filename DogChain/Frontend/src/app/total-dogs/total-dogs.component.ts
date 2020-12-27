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
  totalDogIds: any[];

  constructor(
    private _router: Router,
    private _breeder: BreederService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._breeder.getTotalDogs(this.breederId)
    .subscribe(result => {
      // console.log(result);
      this.totalDogs = <any>(result['totalDogDetails']);
      this.totalDogIds = <any>(result['totalDogIds']);
      console.log(this.totalDogs);
      if (this.totalDogs.length === 0) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
      }
      console.log(this.isAvailable)
    });
  }

}

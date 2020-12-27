import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreederService } from '../breeder.service';

@Component({
  selector: 'app-current-dogs',
  templateUrl: './current-dogs.component.html',
  styleUrls: ['./current-dogs.component.css']
})
export class CurrentDogsComponent implements OnInit {

  breederId: Number;
  isAvailable: Boolean;
  currentDogs: any[];
  currentDogIds: any[];

  constructor(
    private _router: Router,
    private _breeder: BreederService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._breeder.getCurrentDogs(this.breederId)
    .subscribe(result => {
      // console.log(result);
      this.currentDogs = <any>(result['currentDogDetails']);
      this.currentDogIds = <any>(result['currentDogIds']);
      console.log(this.currentDogs);
      if (this.currentDogs.length === 0) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
      }
    });
  }

}

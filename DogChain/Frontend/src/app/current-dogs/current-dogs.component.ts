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

  constructor(
    private _router: Router,
    private _breeder: BreederService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._breeder.getCurrentDogs(this.breederId)
    .subscribe(result => {
      // console.log(result);
      if (result.hasOwnProperty('emptyArrayMsg')) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
        this.currentDogs = <any>(result['currentDogDetails']);
        console.log(this.currentDogs);
      }
    }, error => {
      console.log(error);
    });
  }

}

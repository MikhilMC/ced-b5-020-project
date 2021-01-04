import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
    private _breeder: BreederService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._breeder.getTotalDogs(this.breederId)
    .subscribe(result => {
      if (result.hasOwnProperty('emptyArrayMsg')) {
        // CASE : The total dog id list is empty
        this.isAvailable = false;
      } else if("breederErrorMsg" in result) {
        // CASE : Wrong breederId. Working of this app is compromised.
        alert('Wrong breederId. Working of this app is compromised.')
        this._auth.logoutUser();
      } else {
        // CASE : The total dog id list is not empty
        this.isAvailable = true;
        this.totalDogs = <any>(result['totalDogDetails']);
        console.log(this.totalDogs);
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    });
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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

  constructor(
    private _breeder: BreederService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._breeder.getSoldDogs(this.breederId)
    .subscribe(result => {
      if (result.hasOwnProperty('emptyArrayMsg')) {
        // CASE : The sold dog id list is empty
        this.isAvailable = false;
      } else if("breederErrorMsg" in result) {
        // CASE : Wrong breederId. Working of this app is compromised.
        alert('Wrong breederId. Working of this app is compromised.')
        this._auth.logoutUser();
      } else {
        // CASE : The sold dog id list is not empty
        this.isAvailable = true;
        this.soldDogs = <any>(result['soldDogDetails']);
        console.log(this.soldDogs);
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

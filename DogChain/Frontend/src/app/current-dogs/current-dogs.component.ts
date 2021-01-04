import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
    private _breeder: BreederService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
    this._breeder.getCurrentDogs(this.breederId)
    .subscribe(result => {
      // console.log(result);
      if (result.hasOwnProperty('emptyArrayMsg')) {
        // CASE : The current dog id list is empty
        this.isAvailable = false;
      } else if("breederErrorMsg" in result) {
        // CASE : Wrong breederId. Working of this app is compromised.
        alert('Wrong breederId. Working of this app is compromised.')
        this._auth.logoutUser();
      } else {
        // CASE : The current dog id list is not empty
        this.isAvailable = true;
        this.currentDogs = <any>(result['currentDogDetails']);
        console.log(this.currentDogs);
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

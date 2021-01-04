import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
import { BreederService } from "../breeder.service";

@Component({
  selector: 'app-single-dog',
  templateUrl: './single-dog.component.html',
  styleUrls: ['./single-dog.component.css']
})
export class SingleDogComponent implements OnInit {

  dogId: Number;
  dogDetails: any;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _breeder: BreederService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      this._breeder.getDogDetails(this.dogId)
      .subscribe(result => {
        console.log(result);
        if ("msg" in result) {
          // CASE : The details of the dog with the given id is not saved in the blockchain
          this.isAvailable = false;
        } else {
          // CASE : The details of the dog with the given id is available in the blockchain
          this.isAvailable = true;
          this.dogDetails = result;
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._auth.logoutUser();
          }
        }
      });
    });
  }

}

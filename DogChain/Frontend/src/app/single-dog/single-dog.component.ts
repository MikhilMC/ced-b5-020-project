import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
    private _router: Router,
    private _breeder: BreederService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      this._breeder.getDogDetails(this.dogId)
      .subscribe(result => {
        this.dogDetails = result;
        console.log(this.dogDetails);
        if (this.dogDetails == undefined) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
        }
      });
    });
  }

}

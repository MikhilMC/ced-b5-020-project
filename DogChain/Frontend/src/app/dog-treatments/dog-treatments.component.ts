import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "../doctor.service";

@Component({
  selector: 'app-dog-treatments',
  templateUrl: './dog-treatments.component.html',
  styleUrls: ['./dog-treatments.component.css']
})
export class DogTreatmentsComponent implements OnInit {

  dogId: Number;
  dogTreatmentData: any[];
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _doctor: DoctorService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      console.log(this.dogId);
      this._doctor.dogTreatments(this.dogId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          this.dogTreatmentData = <any>(result);
          console.log(this.dogTreatmentData);
        }
      }, error => {
        console.log(error);
      });
    });
  }

}

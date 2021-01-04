import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
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
    private _doctor: DoctorService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      console.log(this.dogId);
      this._doctor.dogTreatments(this.dogId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          // CASE : Dog's treatment id list is empty
          this.isAvailable = false;
        } else if (result.hasOwnProperty('msg')) {
          // CASE : Wrong dogId. Working of this app is compromised.
          alert('Wrong dogId. Working of this app is compromised.')
          this._auth.logoutUser();
        } else {
          // CASE : Dog's treatment id list is not empty
          this.isAvailable = true;
          this.dogTreatmentData = <any>(result);
          console.log(this.dogTreatmentData);
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

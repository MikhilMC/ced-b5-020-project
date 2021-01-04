import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
import { DoctorService } from "../doctor.service";

@Component({
  selector: 'app-treatment-data',
  templateUrl: './treatment-data.component.html',
  styleUrls: ['./treatment-data.component.css']
})
export class TreatmentDataComponent implements OnInit {

  treatId: Number;
  treatData: any;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _doctor: DoctorService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.treatId = Number(params.get('treatId'));
      console.log(this.treatId);
      this._doctor.getTreatmentData(this.treatId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          // CASE : Treatment data is absent
          this.isAvailable = false;
        } else {
          // CASE : Treatment data is present
          this.isAvailable = true;
          this.treatData = result;
          console.log(this.treatData);
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

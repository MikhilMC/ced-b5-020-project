import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-vaccination-data',
  templateUrl: './vaccination-data.component.html',
  styleUrls: ['./vaccination-data.component.css']
})
export class VaccinationDataComponent implements OnInit {

  vaccId: Number;
  vaccData: any;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _doctor: DoctorService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.vaccId = Number(params.get('vaccId'));
      console.log(this.vaccId);
      this._doctor.getVaccineData(this.vaccId)
      .subscribe(result => {
        if (result.hasOwnProperty('msg')) {
          // CASE : Vaccination data is absent
          this.isAvailable = false;
        } else {
          // CASE : Vaccination data is present
          this.isAvailable = true;
          this.vaccData = result;
          console.log(this.vaccData);
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

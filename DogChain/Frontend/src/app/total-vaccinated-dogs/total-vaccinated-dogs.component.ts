import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-total-vaccinated-dogs',
  templateUrl: './total-vaccinated-dogs.component.html',
  styleUrls: ['./total-vaccinated-dogs.component.css']
})
export class TotalVaccinatedDogsComponent implements OnInit {

  doctorId: Number;
  vaccineRecord: any[];
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _doctor: DoctorService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.doctorId = Number(params.get('doctorId'))
      console.log(this.doctorId);
      this._doctor.doctorVaccinationRecord(this.doctorId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          // CASE : Doctor's vaccination id list is empty
          this.isAvailable = false;
        } else if("doctorErrorMsg" in result) {
          // CASE : Wrong doctorId. Working of this app is compromised.
          alert('Wrong doctorId. Working of this app is compromised.')
          this._auth.logoutUser();
        } else {
          // CASE : Doctor's vaccination id list is not empty
          this.isAvailable = true;
          this.vaccineRecord = <any>(result);
          console.log(this.vaccineRecord);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._auth.logoutUser();
          }
        }
      });
    })
  }

}

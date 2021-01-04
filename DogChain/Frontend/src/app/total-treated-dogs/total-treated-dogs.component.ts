import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-total-treated-dogs',
  templateUrl: './total-treated-dogs.component.html',
  styleUrls: ['./total-treated-dogs.component.css']
})
export class TotalTreatedDogsComponent implements OnInit {

  doctorId: Number;
  treatmentData: any[];
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _doctor: DoctorService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.doctorId = Number(params.get('doctorId'))
      console.log(this.doctorId);
      this._doctor.doctorTreatmentRecord(this.doctorId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          // CASE : Doctor's treatment id list is empty
          this.isAvailable = false;
        } else if("doctorErrorMsg" in result) {
          // CASE : Wrong doctorId. Working of this app is compromised.
          alert('Wrong doctorId. Working of this app is compromised.')
          this._auth.logoutUser();
        } else {
          // CASE : Doctor's treatment id list is not empty
          this.isAvailable = true;
          this.treatmentData = <any>(result);
          console.log(this.treatmentData);
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

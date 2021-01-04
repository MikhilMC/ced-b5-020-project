import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-single-doctor',
  templateUrl: './single-doctor.component.html',
  styleUrls: ['./single-doctor.component.css']
})
export class SingleDoctorComponent implements OnInit {

  isAvailable: Boolean;
  doctorId: Number;
  doctorData: any;

  constructor(
    private _actRoute: ActivatedRoute,
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.doctorId = Number(params.get('doctorId'));
      console.log(this.doctorId);
      this._authority.getDoctorDetails(this.doctorId)
      .subscribe(result => {
        if (result.hasOwnProperty('msg')) {
          // CASE : The data of the doctor is not present
          this.isAvailable = false;
        } else {
          // CASE : The data of the doctor is present
          this.isAvailable = true;
          this.doctorData = result;
          console.log(this.doctorData);
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

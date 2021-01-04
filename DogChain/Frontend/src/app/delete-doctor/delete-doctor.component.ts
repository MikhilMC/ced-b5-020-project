import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { AuthorityService } from "../authority.service";

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.css']
})
export class DeleteDoctorComponent implements OnInit {

  doctorId: Number;
  name: String;
  nameInCaps: String;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.doctorId = Number(params.get("doctorId"));
      console.log(this.doctorId);
      this._authority.getUnapprovedDoctor(this.doctorId)
      .subscribe(doctor => {
        if (doctor.hasOwnProperty('msg')) {
          // CASE : Details of the doctor with the given id whose details haven't been 
          //        added to blockchain yet, is not present in the database.
          this.isAvailable = false;
        } else {
          // CASE : Details of the doctor with the given id whose details haven't been 
          //        added to blockchain yet, is present in the database.
          this.isAvailable = true;
          console.log(doctor);
          this.name = doctor['name'];
          this.nameInCaps = this.name.toUpperCase();          
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

  deleteDoctor() {
    this._authority.deleteDoctor(this.doctorId)
    .subscribe(doctor => {
      // CASE : Doctor account is approved by the authority
      console.log(doctor);
      this._router.navigate(['/approve-doctors']);
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    })
  }

  gotoDoctorsPage() {
    this._router.navigate(['/approve-doctors']);
  }
}

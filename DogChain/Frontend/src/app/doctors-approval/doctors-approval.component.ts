import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthorityService } from "../authority.service";

@Component({
  selector: 'app-doctors-approval',
  templateUrl: './doctors-approval.component.html',
  styleUrls: ['./doctors-approval.component.css']
})
export class DoctorsApprovalComponent implements OnInit {

  message: String;
  isAvailable: Boolean;
  unapprovedDoctors: any[];

  constructor(
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._authority.getUnapprovedDoctorsList()
    .subscribe(result => {
      if (result.hasOwnProperty('msg')) {
        // CASE : There is no doctors accounts available
        //        whose details haven't been added to blockchain yet.
        this.isAvailable = false;
        this.message = result['msg'];
      } else {
        this.unapprovedDoctors = <any>(result);
        if (this.unapprovedDoctors.length === 0) {
          // CASE : There is no doctors accounts available
          //        whose details haven't been added to blockchain yet.
          this.isAvailable = false;
        } else {
          // CASE : There are doctors accounts available
          //        whose details haven't added to blockchain yet.
          this.isAvailable = true;
        }
        console.log(this.unapprovedDoctors);        
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    });
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-dog-birth-registration-approval',
  templateUrl: './dog-birth-registration-approval.component.html',
  styleUrls: ['./dog-birth-registration-approval.component.css']
})
export class DogBirthRegistrationApprovalComponent implements OnInit {

  isAvailable: Boolean;
  birthRegistrations: any[]

  constructor(
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._authority.getUnapprovedDogRegistrations()
    .subscribe(dogBirthRegistrations => {
      if (dogBirthRegistrations.hasOwnProperty('msg')) {
        // CASE : There is no dog birth registrations details available
        //        which haven't been added to blockchain yet.
        this.isAvailable = false;
      } else {
        this.birthRegistrations = <any>(dogBirthRegistrations);
        if (this.birthRegistrations.length === 0) {
          // CASE : There is no dog birth registrations details available
          //        which haven't been added to blockchain yet.
          this.isAvailable = false;          
        } else {
          // CASE : The dog birth registrations details are available
          //        which haven't been added to blockchain yet.
          this.isAvailable = true;
        }
        console.log(this.isAvailable);
        console.log(this.birthRegistrations);        
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

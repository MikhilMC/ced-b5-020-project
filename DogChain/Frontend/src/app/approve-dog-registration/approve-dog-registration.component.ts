import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-approve-dog-registration',
  templateUrl: './approve-dog-registration.component.html',
  styleUrls: ['./approve-dog-registration.component.css']
})
export class ApproveDogRegistrationComponent implements OnInit {

  dogId: Number;
  dogName: String;
  nameInCaps: String;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      console.log(this.dogId);
      this._authority.getUnapprovedDogRegistration(this.dogId)
      .subscribe(dog => {
        if (dog.hasOwnProperty('msg')) {
          // CASE : Details of the dog with the given id whose details
          //        haven't been added to blockchain yet, is not present in the database.
          this.isAvailable = false;
        } else {
          // CASE : Details of the dog with the given id whose details
          //        haven't been added to blockchain yet, is present in the database.
          this.isAvailable = true;
          console.log(dog);
          this.dogName = dog['dogName'];
          this.nameInCaps = this.dogName.toUpperCase();
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

  approveDogBirthRegistration() {
    let data = {dogId: this.dogId};
    this._authority.approveDogRegistration(data)
    .subscribe(result => {
      // CASE : Dog birth registration is approved by the authority
      console.log(result);
      this._router.navigate(['/approve-dog-birth-registrations']);
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    });
  }

  gotoDogBirthRegistration() {
    this._router.navigate(['/approve-dog-birth-registrations']);
  }

}

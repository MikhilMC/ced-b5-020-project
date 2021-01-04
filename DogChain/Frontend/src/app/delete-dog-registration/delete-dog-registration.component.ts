import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-delete-dog-registration',
  templateUrl: './delete-dog-registration.component.html',
  styleUrls: ['./delete-dog-registration.component.css']
})
export class DeleteDogRegistrationComponent implements OnInit {

  dogId: Number;
  isAvailable: Boolean;
  dogName: String;
  nameInCaps: String;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
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

  deleteDogBirthRegistration() {
    this._authority.deleteDogRegistration(this.dogId)
    .subscribe(result => {
      // CASE : Dog birth registration is deleted by the authority
      console.log(result);
      this._router.navigate(['/approve-dog-birth-registrations'])
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    })
  }

  gotoDogBirthRegistration() {
    this._router.navigate(['/approve-dog-birth-registrations']);
  }

}

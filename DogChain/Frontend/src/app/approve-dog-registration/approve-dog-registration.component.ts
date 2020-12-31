import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      console.log(this.dogId);
      this._authority.getUnapprovedDogRegistration(this.dogId)
      .subscribe(dog => {
        if (dog.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          console.log(dog);
          this.dogName = dog['dogName'];
          this.nameInCaps = this.dogName.toUpperCase();
        }
      }, error => {
        console.log(error);
      });
    });
  }

  approveDogBirthRegistration() {
    let data = {dogId: this.dogId};
    this._authority.approveDogRegistration(data)
    .subscribe(result => {
      console.log(result);
      this._router.navigate(['/approve-dog-birth-registrations']);
    }, error => {
      console.log(error);
    });
  }

  gotoDogBirthRegistration() {
    this._router.navigate(['/approve-dog-birth-registrations']);
  }

}

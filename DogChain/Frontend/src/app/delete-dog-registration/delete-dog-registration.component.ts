import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      console.log(this.dogId);
      this._authority.getUnapprovedDogRegistration(this.dogId).subscribe(dog => {
        if (dog.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          console.log(dog);
          this.dogName = dog['dogName'];
          this.nameInCaps = this.dogName.toUpperCase();
        }
      });
    });
  }

  deleteDogBirthRegistration() {
    this._authority.deleteDogRegistration(this.dogId)
    .subscribe(result => {
      console.log(result);
      this._router.navigate(['/approve-dog-birth-registrations'])
    })
  }

  gotoDogBirthRegistration() {
    this._router.navigate(['/approve-dog-birth-registrations']);
  }

}

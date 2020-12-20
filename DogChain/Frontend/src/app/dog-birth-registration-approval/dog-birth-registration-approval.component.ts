import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-dog-birth-registration-approval',
  templateUrl: './dog-birth-registration-approval.component.html',
  styleUrls: ['./dog-birth-registration-approval.component.css']
})
export class DogBirthRegistrationApprovalComponent implements OnInit {

  isAvailable: Boolean;
  message: String;
  birthRegistrations: any[]

  constructor(
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._authority.getUnapprovedDogRegistrations()
    .subscribe(dogBirthRegistrations => {
      if (dogBirthRegistrations.hasOwnProperty('msg')) {
        this.isAvailable = false;
        this.message = dogBirthRegistrations['msg'];
      } else {
        this.birthRegistrations = <any>(dogBirthRegistrations);
        if (this.birthRegistrations.length === 0) {
          this.isAvailable = false;          
        } else {
          this.isAvailable = true;
        }
        console.log(this.isAvailable);
        console.log(this.message);
        console.log(this.birthRegistrations);        
      }
    });
  }

}

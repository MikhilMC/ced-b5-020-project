import { Component, OnInit } from '@angular/core';
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
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._authority.getUnapprovedDoctorsList().subscribe(result => {
      if (result.hasOwnProperty('msg')) {
        this.isAvailable = false;
        this.message = result['msg'];
      } else {
        this.unapprovedDoctors = <any>(result);
        if (this.unapprovedDoctors.length === 0) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
        }
        console.log(this.unapprovedDoctors);        
      }
    });
  }

}

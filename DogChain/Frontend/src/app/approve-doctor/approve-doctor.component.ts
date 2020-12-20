import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-approve-doctor',
  templateUrl: './approve-doctor.component.html',
  styleUrls: ['./approve-doctor.component.css']
})
export class ApproveDoctorComponent implements OnInit {

  userId: Number;
  name: String;
  nameInCaps: String;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
      console.log(this.userId);
      this._authority.getUnapprovedDoctor(this.userId).subscribe(user => {
        if (user.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          console.log(user);
          this.name = user['name'];
          this.nameInCaps = this.name.toUpperCase();
        }
      });
    });
  }

  approveDoctor() {
    let data = {userId: this.userId}
    // console.log(data);
    this._authority.approveDoctor(data).subscribe(result => {
      console.log(result);
      this._router.navigate(['/approve-doctors']);      
    });
  }

  gotoDoctorsPage() {
    this._router.navigate(['/approve-doctors']);
  }

}

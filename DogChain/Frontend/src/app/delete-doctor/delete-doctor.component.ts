import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityService } from "../authority.service";

@Component({
  selector: 'app-delete-doctor',
  templateUrl: './delete-doctor.component.html',
  styleUrls: ['./delete-doctor.component.css']
})
export class DeleteDoctorComponent implements OnInit {

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
      this.userId = Number(params.get("userId"));
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

  deleteDoctor(_userId) {
    console.log(_userId);
    this._authority.deleteDoctor(this.userId).subscribe(user => {
      console.log(user);
      this._router.navigate(['/approve-doctors']);
    })
  }

  gotoDoctorsPage() {
    this._router.navigate(['/approve-doctors']);
  }
}

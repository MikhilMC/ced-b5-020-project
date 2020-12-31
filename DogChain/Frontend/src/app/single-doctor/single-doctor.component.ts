import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-single-doctor',
  templateUrl: './single-doctor.component.html',
  styleUrls: ['./single-doctor.component.css']
})
export class SingleDoctorComponent implements OnInit {

  isAvailable: Boolean;
  doctorId: Number;
  doctorData: any;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.doctorId = Number(params.get('doctorId'));
      console.log(this.doctorId);
      this._authority.getDoctorDetails(this.doctorId)
      .subscribe(result => {
        if (result.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          this.doctorData = result;
          console.log(this.doctorData);
        }
      }, error => {
        console.log(error);
      });
    });
  }

}

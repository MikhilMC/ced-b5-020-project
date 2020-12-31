import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-approve-doctor',
  templateUrl: './approve-doctor.component.html',
  styleUrls: ['./approve-doctor.component.css']
})
export class ApproveDoctorComponent implements OnInit {

  doctorId: Number;
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
      this.doctorId = Number(params.get('doctorId'));
      console.log(this.doctorId);
      this._authority.getUnapprovedDoctor(this.doctorId)
      .subscribe(doctor => {
        if (doctor.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          console.log(doctor);
          this.name = doctor['name'];
          this.nameInCaps = this.name.toUpperCase();
        }
      }, error => {
        console.log(error);
      });
    });
  }

  approveDoctor() {
    let data = {doctorId: this.doctorId}
    // console.log(data);
    this._authority.approveDoctor(data)
    .subscribe(result => {
      console.log(result);
      this._router.navigate(['/approve-doctors']);      
    }, error => {
      console.log(error);
    });
  }

  gotoDoctorsPage() {
    this._router.navigate(['/approve-doctors']);
  }

}

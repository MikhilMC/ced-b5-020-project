import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.css']
})
export class DoctorsListComponent implements OnInit {

  isAvailable: Boolean;
  doctorsList: any[];

  constructor(
    private _router: Router,
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._authority.getDoctorsList()
    .subscribe(result => {
      if (result.hasOwnProperty('emptyArrayMsg')) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
        this.doctorsList = <any>(result);
        console.log(this.doctorsList);
      }
    }, error => {
      console.log(error);
    });
  }

}

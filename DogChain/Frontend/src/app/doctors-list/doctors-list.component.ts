import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
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
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._authority.getDoctorsList()
    .subscribe(result => {
      if (result.hasOwnProperty('emptyArrayMsg')) {
        // CASE : There is no doctor account's data present in the system
        this.isAvailable = false;
      } else {
        // CASE : There are doctor account's data present in the system
        this.isAvailable = true;
        this.doctorsList = <any>(result);
        console.log(this.doctorsList);
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    });
  }

}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.css']
})
export class DogsListComponent implements OnInit {

  isAvailable: Boolean;
  dogsList: any[];

  constructor(
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._authority.getDogsList()
    .subscribe(result => {
      if (result.hasOwnProperty('emptyArrayMsg')) {
        // CASE : There is no dog's data present in the system
        this.isAvailable = false;
      } else {
        // CASE : There are dog's data present in the system
        this.isAvailable = true;
        this.dogsList = <any>(result);
        console.log(this.dogsList);
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

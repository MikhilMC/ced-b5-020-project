import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthorityService } from "../authority.service";

@Component({
  selector: 'app-breeders-list',
  templateUrl: './breeders-list.component.html',
  styleUrls: ['./breeders-list.component.css']
})
export class BreedersListComponent implements OnInit {

  isAvailable: Boolean;
  breedersList: any[]

  constructor(
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._authority.getBreedersList()
    .subscribe(result => {
      if (result.hasOwnProperty('emptyArrayMsg')) {
        // CASE : There is no breeder account's data present in the system
        this.isAvailable = false;
      } else {
        // CASE : There are breeder account's data present in the system
        this.isAvailable = true;
        this.breedersList = <any>(result);
        console.log(this.breedersList);
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

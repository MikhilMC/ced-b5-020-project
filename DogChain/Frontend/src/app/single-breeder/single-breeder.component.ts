import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-single-breeder',
  templateUrl: './single-breeder.component.html',
  styleUrls: ['./single-breeder.component.css']
})
export class SingleBreederComponent implements OnInit {

  isAvailable: Boolean;
  breederId: Number;
  breederData: any;

  constructor(
    private _actRoute: ActivatedRoute,
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.breederId = Number(params.get('breederId'));
      console.log(this.breederId);
      this._authority.getBreederDetails(this.breederId)
      .subscribe(result => {
        if (result.hasOwnProperty('msg')) {
          // CASE : The data of the breeder is not present
          this.isAvailable = false;
        } else {
          // CASE : The data of the breeder is present
          this.isAvailable = true;
          this.breederData = result;
          console.log(this.breederData);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._auth.logoutUser();
          }
        }
      })
    });
  }

}

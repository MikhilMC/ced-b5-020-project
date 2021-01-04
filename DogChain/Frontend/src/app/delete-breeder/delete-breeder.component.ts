import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-delete-breeder',
  templateUrl: './delete-breeder.component.html',
  styleUrls: ['./delete-breeder.component.css']
})
export class DeleteBreederComponent implements OnInit {

  breederId: Number;
  name: String;
  nameInCaps: String;
  isAvailable: Boolean;

  constructor(
    private _authority: AuthorityService,
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.breederId = Number(params.get('breederId'));
      console.log(this.breederId);
      this._authority.getUnapprovedBreeder(this.breederId)
      .subscribe(breeder => {
        if (breeder.hasOwnProperty('msg')) {
          // CASE : Details of the breeder with the given id whose details haven't been 
          //        added to blockchain yet, is not present in the database.
          this.isAvailable = false;
        } else {
          // CASE : Details of the breeder with the given id whose details haven't been 
          //        added to blockchain yet, is present in the database.
          this.isAvailable = true;
          console.log(breeder);
          this.name = breeder['name'];
          this.nameInCaps = this.name.toUpperCase();
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._auth.logoutUser();
          }
        }
      });
    });
  }

  deleteBreeder() {
    console.log();
    this._authority.deleteBreeder(this.breederId)
    .subscribe(breeder => {
      // CASE : Breeder account is deleted by the authority
      console.log(breeder);
      this._router.navigate(['/approve-breeders']);
    }, error => {
      if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._auth.logoutUser();
          }
        }
    })
  }

  gotoBreedersPage() {
    this._router.navigate(['/approve-breeders']);
  }
}

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthorityService } from "../authority.service";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-breeders-approval',
  templateUrl: './breeders-approval.component.html',
  styleUrls: ['./breeders-approval.component.css']
})
export class BreedersApprovalComponent implements OnInit {

  message: String;
  isAvailable: Boolean;
  unapprovedBreeders: any[];

  constructor(
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._authority.getUnapprovedBreedersList()
    .subscribe(result => {
      if (result.hasOwnProperty('msg')) {
        // CASE : There is no breeder accounts available
        //        whose details haven't been added to blockchain yet.
        this.isAvailable = false;
        this.message = result['msg'];
      } else {
        this.unapprovedBreeders = <any>(result);
        if (this.unapprovedBreeders.length === 0) {
          // CASE : There is no breeder accounts available
          //        whose details haven't been added to blockchain yet.
          this.isAvailable = false;          
        } else {
          // CASE : There are breeder accounts available
          //        whose details haven't added to blockchain yet.
          this.isAvailable = true;
        }
        console.log(this.isAvailable);
        console.log(this.unapprovedBreeders);        
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

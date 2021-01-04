import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-dog-ownership-transfer-approval',
  templateUrl: './dog-ownership-transfer-approval.component.html',
  styleUrls: ['./dog-ownership-transfer-approval.component.css']
})
export class DogOwnershipTransferApprovalComponent implements OnInit {

  isAvailable: Boolean;
  ownershipTransfers: any[]

  constructor(
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._authority.getUnapprovedOwnershipTransfers()
    .subscribe(transferRequests => {
      if (transferRequests.hasOwnProperty('msg')) {
        // CASE : There is no unapproved ownership transfer requests available
        this.isAvailable = false;
      } else {
        this.ownershipTransfers = <any>(transferRequests);
        if (this.ownershipTransfers.length === 0) {
          // CASE : There is no unapproved ownership transfer requests available
          this.isAvailable = false;          
        } else {
          // CASE : There are unapproved ownership transfer requests available
          this.isAvailable = true;
        }
        console.log(this.isAvailable);
        console.log(this.ownershipTransfers);        
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

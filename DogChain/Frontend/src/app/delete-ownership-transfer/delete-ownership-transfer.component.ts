import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-delete-ownership-transfer',
  templateUrl: './delete-ownership-transfer.component.html',
  styleUrls: ['./delete-ownership-transfer.component.css']
})
export class DeleteOwnershipTransferComponent implements OnInit {

  dogId: Number;
  isAvailable: Boolean;
  currentOwnerId: Number;
  newOwnerId: Number;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _authority: AuthorityService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      this._authority.getUnapprovedOwnershipTransfer(this.dogId)
      .subscribe(transfer => {
        if (transfer.hasOwnProperty('msg')) {
          // CASE : The ownership transfer request of the dog with the given id is not available
          this.isAvailable = false;
        } else {
          // CASE : The ownership transfer request of the dog with the given id is available
          this.isAvailable = true;
          console.log(transfer);
          this.currentOwnerId = transfer['currentOwnerId'];
          this.newOwnerId = transfer['newOwnerId'];
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

  deleteDogOwnershipTransfer() {
    this._authority.deleteOwnershipTransfer(this.dogId)
    .subscribe(result => {
      // CASE : The authority cancells the ownership transfer request of this dog.
      console.log(result);
      this._router.navigate(['/approve-dog-ownership-transfers'])
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    })
  }

  gotoDogOwnershipTransfer() {
    this._router.navigate(['/approve-dog-ownership-transfers']);
  }

}

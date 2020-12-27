import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      this._authority.getUnapprovedOwnershipTransfer(this.dogId)
      .subscribe(transfer => {
        if (transfer.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          console.log(transfer);
          this.currentOwnerId = transfer['currentOwnerId'];
          this.newOwnerId = transfer['newOwnerId'];
        }
      });
    });
  }

  deleteDogOwnershipTransfer() {
    this._authority.deleteOwnershipTransfer(this.dogId)
    .subscribe(result => {
      console.log(result);
      this._router.navigate(['/approve-dog-ownership-transfers'])
    })
  }

  gotoDogOwnershipTransfer() {
    this._router.navigate(['/approve-dog-ownership-transfers']);
  }

}

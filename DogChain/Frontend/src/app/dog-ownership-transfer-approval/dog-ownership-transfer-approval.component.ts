import { Component, OnInit } from '@angular/core';
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
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._authority.getUnapprovedOwnershipTransfers()
    .subscribe(transferRequests => {
      if (transferRequests.hasOwnProperty('msg')) {
        this.isAvailable = false;
      } else {
        this.ownershipTransfers = <any>(transferRequests);
        if (this.ownershipTransfers.length === 0) {
          this.isAvailable = false;          
        } else {
          this.isAvailable = true;
        }
        console.log(this.isAvailable);
        // console.log(this.message);
        console.log(this.ownershipTransfers);        
      }
    }, error => {
      console.log(error);
    });
  }

}

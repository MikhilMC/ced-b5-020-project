import { Component, OnInit } from '@angular/core';
import { AuthorityService } from "../authority.service";

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
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._authority.getUnapprovedBreedersList()
    .subscribe(result => {
      if (result.hasOwnProperty('msg')) {
        this.isAvailable = false;
        this.message = result['msg'];
      } else {
        this.unapprovedBreeders = <any>(result);
        if (this.unapprovedBreeders.length === 0) {
          this.isAvailable = false;          
        } else {
          this.isAvailable = true;
        }
        console.log(this.isAvailable);
        console.log(this.unapprovedBreeders);        
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthorityService } from "../authority.service";

@Component({
  selector: 'app-approve-breeder',
  templateUrl: './approve-breeder.component.html',
  styleUrls: ['./approve-breeder.component.css']
})
export class ApproveBreederComponent implements OnInit {

  userId: Number;
  name: String;
  nameInCaps: String;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap.subscribe(params => {
      this.userId = Number(params.get('userId'));
      console.log(this.userId);
      this._authority.getUnapprovedBreeder(this.userId).subscribe(user => {
        if (user.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          console.log(user);
          this.name = user['name'];
          this.nameInCaps = this.name.toUpperCase();
        }
      });
    });
  }

  approveBreeder() {
    const data = {userId: this.userId};
    this._authority.approveBreeder(data).subscribe(result => {
      console.log(result);
      this._router.navigate(['/approve-breeders']);
    });
  }

  gotoBreedersPage() {
    this._router.navigate(['/approve-breeders']);
  }

}

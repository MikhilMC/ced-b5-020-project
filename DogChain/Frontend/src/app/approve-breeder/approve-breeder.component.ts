import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { AuthorityService } from "../authority.service";

@Component({
  selector: 'app-approve-breeder',
  templateUrl: './approve-breeder.component.html',
  styleUrls: ['./approve-breeder.component.css']
})
export class ApproveBreederComponent implements OnInit {

  breederId: Number;
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
      this.breederId = Number(params.get('breederId'));
      console.log(this.breederId);
      this._authority.getUnapprovedBreeder(this.breederId)
      .subscribe(breeder => {
        if (breeder.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          console.log(breeder);
          this.name = breeder['name'];
          this.nameInCaps = this.name.toUpperCase();
        }
      });
    });
  }

  approveBreeder() {
    const data = {breederId: this.breederId};
    this._authority.approveBreeder(data)
    .subscribe(result => {
      console.log(result);
      this._router.navigate(['/approve-breeders']);
    });
  }

  gotoBreedersPage() {
    this._router.navigate(['/approve-breeders']);
  }

}

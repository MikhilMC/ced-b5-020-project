import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private _router: Router,
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.breederId = Number(params.get('breederId'));
      console.log(this.breederId);
      this._authority.getBreederDetails(this.breederId)
      .subscribe(result => {
        if (result.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          this.breederData = result;
          console.log(this.breederData);
        }
      }, error => {
        console.log(error);
      })
    });
  }

}

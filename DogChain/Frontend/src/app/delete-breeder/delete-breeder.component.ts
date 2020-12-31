import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
    private _router: Router
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
      }, error => {
        console.log(error);
      });
    });
  }

  deleteBreeder() {
    console.log();
    this._authority.deleteBreeder(this.breederId)
    .subscribe(breeder => {
      console.log(breeder);
      this._router.navigate(['/approve-breeders']);
    }, error => {
      console.log(error);
    })
  }

  gotoBreedersPage() {
    this._router.navigate(['/approve-breeders']);
  }
}

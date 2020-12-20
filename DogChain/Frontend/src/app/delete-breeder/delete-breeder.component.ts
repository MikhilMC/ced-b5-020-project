import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-delete-breeder',
  templateUrl: './delete-breeder.component.html',
  styleUrls: ['./delete-breeder.component.css']
})
export class DeleteBreederComponent implements OnInit {

  userId: Number;
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

  deleteBreeder(_userId) {
    console.log(_userId);
    this._authority.deleteBreeder(this.userId).subscribe(user => {
      console.log(user);
      this._router.navigate(['/approve-breeders']);
    })
  }

  gotoBreedersPage() {
    this._router.navigate(['/approve-breeders']);
  }
}

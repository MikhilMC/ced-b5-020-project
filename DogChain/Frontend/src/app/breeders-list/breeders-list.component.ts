import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthorityService } from "../authority.service";

@Component({
  selector: 'app-breeders-list',
  templateUrl: './breeders-list.component.html',
  styleUrls: ['./breeders-list.component.css']
})
export class BreedersListComponent implements OnInit {

  isAvailable: Boolean;
  breedersList: any[]

  constructor(
    private _router: Router,
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._authority.getBreedersList()
    .subscribe(result => {
      if (result.hasOwnProperty('emptyArrayMsg')) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
        this.breedersList = <any>(result);
        console.log(this.breedersList);
      }
    }, error => {
      console.log(error);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorityService } from '../authority.service';

@Component({
  selector: 'app-dogs-list',
  templateUrl: './dogs-list.component.html',
  styleUrls: ['./dogs-list.component.css']
})
export class DogsListComponent implements OnInit {

  isAvailable: Boolean;
  dogsList: any[];

  constructor(
    private _router: Router,
    private _authority: AuthorityService
  ) { }

  ngOnInit(): void {
    this._authority.getDogsList()
    .subscribe(result => {
      if (result.hasOwnProperty('emptyArrayMsg')) {
        this.isAvailable = false;
      } else {
        this.isAvailable = true;
        this.dogsList = <any>(result);
        console.log(this.dogsList);
      }
    }, error => {
      console.log(error);
    });
  }

}

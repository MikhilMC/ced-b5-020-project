import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-breeder-home',
  templateUrl: './breeder-home.component.html',
  styleUrls: ['./breeder-home.component.css']
})
export class BreederHomeComponent implements OnInit {

  userId: Number;

  constructor(
    private _actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
  }

}

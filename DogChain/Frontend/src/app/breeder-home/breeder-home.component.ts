import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breeder-home',
  templateUrl: './breeder-home.component.html',
  styleUrls: ['./breeder-home.component.css']
})
export class BreederHomeComponent implements OnInit {

  breederId: Number;

  constructor(
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  userId: Number;
  
  constructor() { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
  }

}

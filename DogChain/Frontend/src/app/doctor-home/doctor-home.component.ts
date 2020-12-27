import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.component.html',
  styleUrls: ['./doctor-home.component.css']
})
export class DoctorHomeComponent implements OnInit {

  doctorId: Number;
  
  constructor() { }

  ngOnInit(): void {
    this.doctorId = Number(localStorage.getItem('doctorId'));
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-menu',
  templateUrl: './register-menu.component.html',
  styleUrls: ['./register-menu.component.css']
})
export class RegisterMenuComponent implements OnInit {

  accounts: any[] = [
    {
      type: 'DOG OWNER / BREEDER',
      address: 'breeder'
    },
    {
      type: 'VETERINARY DOCTOR',
      address: 'doctor'
    },
    {
      type: 'KENNEL CLUB AUTHORITY',
      address: 'authority'
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

}

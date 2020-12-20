import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {

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
  ]

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authority-home',
  templateUrl: './authority-home.component.html',
  styleUrls: ['./authority-home.component.css']
})
export class AuthorityHomeComponent implements OnInit {

  activities: any[] = [
    {
      type: "APPROVING BREEDER/OWNER ACCOUNTS",
      link: "/approve-breeders"
    },
    {
      type: "APPROVING DOCTOR ACCOUNTS",
      link: "/approve-doctors"
    },
    {
      type: "APPROVING DOG'S BIRTH REGISTRATION",
      link: "/approve-dog-birth-registrations"
    },
    {
      type: "APPROVING OWNERSHIP TRANSFER OF DOGS",
      link: "/approve-dog-ownership-transfers"
    },
    {
      type: "DISPLAYING COMPLETE LIST OF BREEDERS",
      link: "/breeders-list"
    },
    {
      type: "DISPLAYING COMPLETE LIST OF DOCTORS",
      link: "/doctors-list"
    },
    {
      type: "DISPLAYING COMPLETE LIST OF DOGS",
      link: "/all-dogs-list"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}

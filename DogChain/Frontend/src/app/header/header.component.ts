import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  // isBreeder: Boolean;
  // isDoctor: Boolean;
  // isAuthority: Boolean;
  constructor() { }

  ngOnInit(): void {
    // if (localStorage.getItem('userType') === 'breeder' && localStorage.getItem('userType') !=='doctor' && localStorage.getItem('userType') !=='authority') {
    //   this.isBreeder = true;
    //   this.isDoctor = false;
    //   this.isAuthority = false
    // } else if (localStorage.getItem('userType') === 'doctor' && localStorage.getItem('userType') !=='breeder' && localStorage.getItem('userType') !=='authority') {
    //   this.isDoctor = true;
    //   this.isBreeder = false;
    //   this.isAuthority = false;
    // } else if (localStorage.getItem('userType') !== 'doctor' && localStorage.getItem('userType') !=='breeder' && localStorage.getItem('userType') ==='authority'){
    //   this.isAuthority = true;
    //   this.isBreeder = false;
    //   this.isDoctor = false;
    // } else {
    //   this.isAuthority = true;
    //   this.isBreeder = true;
    //   this.isDoctor = true;
    // }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navbarOpen = false;
  isBreeder: Boolean;
  isDoctor: Boolean;
  isAuthority: Boolean;
  constructor(
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.changeHeader();
  }

  ngOnChanges(): void {
    this.changeHeader();
  }

  ngDoCheck(): void {
    this.changeHeader();
  }

  ngAfterContentInit(): void {
    this.changeHeader();
  }

  ngAfterContentChecked(): void {
    this.changeHeader();
  }

  ngAfterViewInit(): void {
    this.changeHeader();
  }

  ngAfterViewChecked(): void {
    this.changeHeader();
  }

  ngOnDestroy(): void {
    this.changeHeader();
  }

  changeHeader() {
    if (this.isLoggedIn()) {
      if (localStorage.getItem('userType') === 'breeder' && localStorage.getItem('userType') !=='doctor' && localStorage.getItem('userType') !=='authority') {
        this.isBreeder = true;
        this.isDoctor = false;
        this.isAuthority = false;
        // console.log(this.isBreeder, this.isDoctor, this.isAuthority);
      } else if (localStorage.getItem('userType') !== 'breeder' && localStorage.getItem('userType') ==='doctor' && localStorage.getItem('userType') !=='authority') {
        this.isBreeder = false;
        this.isDoctor = true;
        this.isAuthority = false;
        // console.log(this.isBreeder, this.isDoctor, this.isAuthority);
      } else if (localStorage.getItem('userType') !== 'breeder' && localStorage.getItem('userType') !=='doctor' && localStorage.getItem('userType') ==='authority'){
        this.isBreeder = false;
        this.isDoctor = false;
        this.isAuthority = true;
        // console.log(this.isBreeder, this.isDoctor, this.isAuthority);
      }
    } else {
      this.isBreeder = false;
      this.isDoctor = false;
      this.isAuthority = false;
      // console.log(this.isBreeder, this.isDoctor, this.isAuthority);
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  isLoggedIn() {
    return this._auth.isLoggedIn();
  }

  logoutUser() {
    this.isBreeder = false;
    this.isDoctor = false;
    this.isAuthority = false;
    this._auth.logOut();
  }

}

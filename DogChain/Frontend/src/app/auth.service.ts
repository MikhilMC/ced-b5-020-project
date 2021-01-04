import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _registerBreederUrl = "http://localhost:3000/register-breeder";
  private _registerDoctorUrl = "http://localhost:3000/register-doctor";
  private _registerAuthorityUrl = "http://localhost:3000/register-authority";

  private _loginBreederUrl = "http://localhost:3000/login-breeder";
  private _loginDoctorUrl = "http://localhost:3000/login-doctor";
  private _loginAuthorityUrl = "http://localhost:3000/login-authority";


  constructor(
    private _http: HttpClient,
    private _router: Router
  ) { }

  registerUser(user, accountType) {
    console.log(user, accountType);
    if (accountType == 'breeder' || accountType == 'authority') {
      type normalUser = {
        userId: number,
        name: string,
        email: string,
        password: string
      }

      const userData = <normalUser>{};
      for (const key in user) {
        if (key != 'hospital') {
          userData[key] = user[key];
        }
      }

      if (accountType == 'breeder') {
        return this._http.post(this._registerBreederUrl, userData);
      } else {
        return this._http.post(this._registerAuthorityUrl, userData);
      }
    } else {
      return this._http.post(this._registerDoctorUrl, user);
    }
  }

  loginUser(user, accountType) {
    console.log(user, accountType);
    if (accountType === 'breeder') {
      return this._http.post(this._loginBreederUrl, user);
    } else if (accountType === 'doctor') {
      return this._http.post(this._loginDoctorUrl, user);
    } else {
      return this._http.post(this._loginAuthorityUrl, user);
    }
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    let accountType = localStorage.getItem('userType');
    localStorage.removeItem('userType')
    if (accountType === 'breeder') {
      localStorage.removeItem('breederId');
    } else if (accountType === 'doctor') {
      localStorage.removeItem('doctorId');
    }
    this._router.navigate(['/login-menu'])
  }

}

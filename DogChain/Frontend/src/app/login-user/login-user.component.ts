import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators} from "@angular/forms";

import { AuthService } from "../auth.service";
import { LoginDataModel } from "./login.data.model";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  accountType: String;
  account: String;

  loginForm = this._fb.group({
    email: ['',[Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params => {
      this.accountType = params.get("type");
      console.log(this.accountType);
      this.account = this.accountType.toUpperCase();
    });
  }

  loginData = new LoginDataModel(null, null);

  loginUser(): void {
    this.loginData = this.loginForm.value;
    this._auth.loginUser(this.loginData, this.accountType)
    .subscribe(result => {
      console.log(result);
      console.log(result['user']);
      if ("msg" in result['user']) {
        // CASE : Either entered invalid email or password.
        alert(result['user']["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/login-user', this.accountType]);
        });
      } else {
        if (this.accountType === 'breeder' || this.accountType === 'doctor') {
          // CASE : Either the account type is breeder or doctor
          if (!result['user']["hasAddedToBlockchain"]) {
            // CASE : The account haven't been approved by the authority yet.
            this._router.navigate(['primary-message'], { queryParams: { message: "Sorry, your account haven't been approved yet. Either the process is not completed yet, or your account have been rejected. Please check after sometime." } });
          } else {
            if (this.accountType === 'breeder') {
              // CASE : The breeder account is approved, and login is successfull.
              localStorage.setItem('token', result['token'])
              localStorage.setItem('userType','breeder');
              localStorage.setItem('breederId',result['user']['breederId']);
              this._router.navigate(['/breeder-home']);
            } else {
              // CASE : The doctor account is approved, and login is successfull.
              localStorage.setItem('token', result['token'])
              localStorage.setItem('userType','doctor');
              localStorage.setItem('doctorId',result['user']['doctorId']);
              this._router.navigate(['/doctor-home']);
            }
          }
        } else {
          // CASE : The authority login is successfull
          localStorage.setItem('userType','authority');
          localStorage.setItem('token', result['token'])
          this._router.navigate(['/authority-home']);
        }
      }
    }, error => {
      console.log(error);
    });
  }
}

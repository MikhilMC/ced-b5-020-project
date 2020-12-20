import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators, ɵangular_packages_forms_forms_b} from "@angular/forms";

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

  loggedUser = this._fb.group({
    email: [
      '',
      [
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
        Validators.required
      ]
    ],
    password: [
      '',
      [
        Validators.minLength(3),
        Validators.required
      ]
    ]
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
    this.loginData = this.loggedUser.value;
    // console.log(this.loginData);
    this._auth.loginUser(this.loginData, this.accountType).subscribe(result => {
      console.log(result);
      if ("msg" in result) {
        alert(result["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/login-user', this.accountType]);
        });
      } else {
        if (this.accountType === 'breeder' || this.accountType === 'doctor') {
          if (!result["hasAddedToBlockchain"]) {
            this._router.navigate(['primary-message'], { queryParams: { message: "Sorry, the approval process of your account haven't been completed yet. Please check after sometime" } });
          } else {
            if (this.accountType === 'breeder') {
              this._router.navigate(['/breeder-home']);
              // localStorage.setItem('userType','breeder');
              localStorage.setItem('userId',result['userId']);
            } else {
              this._router.navigate(['/doctor-home']);
              // localStorage.setItem('userType','doctor');
              localStorage.setItem('userId',result['userId']);
            }
          }
        } else {
          this._router.navigate(['/authority-home']);
          // localStorage.setItem('userType','authority');
        }
      }
    });
  }
}
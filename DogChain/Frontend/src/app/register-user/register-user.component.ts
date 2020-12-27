import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { RegisterDataModel } from "./register.data.model";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  accountType: String;
  account: String;
  isDoctor: Boolean;
  registerForm = this._fb.group({
    userId: ['',[Validators.pattern(/([0-9]+)/), Validators.required]],
    name: ['', Validators.required],
    email: ['', [Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/), Validators.required]],
    hospital: [''],
    password: ['', [Validators.minLength(3), Validators.required]]
  });

  constructor(
    private _actRoute: ActivatedRoute,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) { }

  registerData = new RegisterDataModel(null, null, null, null, null);

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe((params)=>{
      this.accountType = params.get('type');
      // console.log(this.accountType);
      if (this.accountType == 'doctor') {
        this.isDoctor = true;
      } else {
        this.isDoctor = false;
      }
      this.account = this.accountType.toUpperCase();
      console.log(this.account);
    });
  }

  registerUser(): void {
    this.registerData = this.registerForm.value;
    console.log(this.registerData);
    this._auth.registerUser(this.registerData, this.accountType)
    .subscribe((result)=>{
      // console.log(result);
      if ("msg" in result) {
        alert(result["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/register-user', this.accountType]);
        });
      } else {
        // console.log(result["signedupUser"]["hasAddedToBlockchain"] === false);
        // console.log(result);
        if (result.hasOwnProperty("hasAddedToBlockchain")) {
          // console.log(1);
          console.log(result)
          this._router.navigate(['/primary-message'], { queryParams: { message: "Your account have been submitted for approval process. Please wait until the completion of approval process." } });
        } else {
          // console.log(2);
          console.log(result);
          // localStorage.setItem('userType','authority');
          this._router.navigate(["/authority-home"]);
        }
      }
    });
  }

}

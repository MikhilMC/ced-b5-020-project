import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { DogBirthRegisterDataModel } from "./dog.birth.register.model";
import { Router } from '@angular/router';
import { BreederService } from "../breeder.service";

@Component({
  selector: 'app-dog-birth-registration',
  templateUrl: './dog-birth-registration.component.html',
  styleUrls: ['./dog-birth-registration.component.css']
})
export class DogBirthRegistrationComponent implements OnInit {

  userId: Number;

  registeredDog = this._fb.group({
    dogId : ['', [Validators.pattern(/(0-9)+/), Validators.required]],
    dogName: ['', Validators.required],
    breed: ['', Validators.required],
    colour: ['', Validators.required],
    sex: ['', Validators.required],
    dob: ['', Validators.required],
    fatherId: ['', [Validators.pattern(/(0-9)+/), Validators.required]],
    motherId: ['', [Validators.pattern(/(0-9)+/), Validators.required]]
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _breeder: BreederService
  ) { }

  dogData = new DogBirthRegisterDataModel(null, null, null, null, null, null, null, null);

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
  }

  registerDog() {
    this.dogData = this.registeredDog.value;
    console.log(this.dogData);
    this._breeder.dogBirthRegister(this.userId, this.dogData)
    .subscribe(result => {
      console.log(result);
      if ("msg" in result) {
        alert(result['msg']);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/dog-registration', this.userId]);
        });
      } else {
        this._router.navigate(['/primary-message'], {queryParams: {message: "Your dog's registration have been submitted for approval process. Please wait until the completion of approval process."}});
      }
    })
  }

}

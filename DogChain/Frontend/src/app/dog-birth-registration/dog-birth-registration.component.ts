import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { BreederService } from "../breeder.service";

@Component({
  selector: 'app-dog-birth-registration',
  templateUrl: './dog-birth-registration.component.html',
  styleUrls: ['./dog-birth-registration.component.css']
})
export class DogBirthRegistrationComponent implements OnInit {

  breederId: Number;
  isFatherRegistered: Boolean;
  isMotherRegistered: Boolean;

  birthRegisterForm = this._fb.group({
    dogId : ['', [Validators.pattern(/[0-9]+/), Validators.required]],
    dogName: ['', Validators.required],
    breed: ['', Validators.required],
    colour: ['', Validators.required],
    sex: ['', Validators.required],
    dob: ['', Validators.required],
    typeOfParents: ['', Validators.required],
    fatherId: [0, Validators.pattern(/[0-9]+/)],
    motherId: [0, Validators.pattern(/[0-9]+/)]
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _breeder: BreederService
  ) { }

  ngOnInit(): void {
    this.breederId = Number(localStorage.getItem('breederId'));
  }

  registerDog() {
    let dogData = {};
    for (const key in this.birthRegisterForm.value) {
      if (key !== 'typeOfParents') {
        dogData[key] = this.birthRegisterForm.value[key];
      }
    }
    console.log(dogData);
    this._breeder.dogBirthRegister(this.breederId, dogData)
    .subscribe(result => {
      console.log(result);
      if ("msg" in result) {
        alert(result["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/dog-birth-registration', this.breederId]);
        });
      } else {
        this._router.navigate(['/primary-message'], {queryParams: {message: "Your dog's registration have been submitted for approval process. Please wait until the completion of approval process."}});
      }
    })
  }

  onChange(value) {
    // console.log(value);
    if (value === 'knownParents') {
      this.isFatherRegistered = true;
      this.isMotherRegistered = true;
    } else if (value === 'unknownMother'){
      this.isFatherRegistered = true;
      this.isMotherRegistered = false;
    } else if (value === 'unknownFather'){
      this.isFatherRegistered = false;
      this.isMotherRegistered = true;
    } else if (value === 'unknownParents'){
      this.isFatherRegistered = false;
      this.isMotherRegistered = false;
    }
  }

}

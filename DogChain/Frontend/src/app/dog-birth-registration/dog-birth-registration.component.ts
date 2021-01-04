import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
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
    private _breeder: BreederService,
    private _auth: AuthService
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
        // CASE : Either entered the dogId which already being used,
        //        or entered fatherId or motherId as a wrong value
        //        because there is no dog details present in the blockchain 
        //        with id as the given fatherId or motherId
        alert(result["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/dog-birth-registration', this.breederId]);
        });
      } else if("breederErrorMsg" in result) {
        // CASE : Wrong breederId. Working of this app is compromised.
        alert('Wrong breederId. Working of this app is compromised.')
        this._auth.logoutUser();
      } else {
        // CASE : Dog birth registration request is submitted, and waiting for approval.
        this._router.navigate(['/secondary-message'], {queryParams: {message: "Your dog's registration have been submitted for approval process. Please wait until the completion of approval process."}});
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    })
  }

  onChange(value) {
    // Function to change the accessibility of the fatherId and motherId fields.
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

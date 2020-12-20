import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BreederService {

  private _puppyRegistrationOfKnownParents = "http://localhost:3000/puppy-registration-of-known-parents";
  private _puppyRegistrationOfUnknownFather = "http://localhost:3000/puppy-registration-of-unknown-father";
  private _puppyRegistrationOfUnknownMother = "http://localhost:3000/puppy-registration-of-unknown-mother";
  private _puppyRegistrationOfUnknownParents = "http://localhost:3000/puppy-registration-of-unknown-parents";

  constructor(
    private _http: HttpClient
  ) { }

  dogBirthRegister(userId, dogData) {
    console.log(userId, dogData);
    dogData['breederId'] = userId;
    if (dogData['fatherId'] !== 0 && dogData['motherId'] !== 0) {
      return this._http.post(this._puppyRegistrationOfKnownParents, dogData);
    } else if (dogData['fatherId'] === 0 && dogData['motherId'] !== 0){
      return this._http.post(this._puppyRegistrationOfUnknownFather, dogData);
    } else if (dogData['fatherId'] === 0 && dogData['motherId'] !== 0){
      return this._http.post(this._puppyRegistrationOfUnknownMother, dogData);
    } else {
      return this._http.post(this._puppyRegistrationOfUnknownParents, dogData);
    }
  }
}

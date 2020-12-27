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

  private _getTotalDogs = "http://localhost:3000/get-total-dogs";
  private _getSoldDogs = "http://localhost:3000/get-sold-dogs";
  private _getCurrentDogs = "http://localhost:3000/get-current-dogs";
  private _getDogDetails = "http://localhost:3000/get-dog-details";

  private _hasAlreadySubmitted = "http://localhost:3000/has-already-submitted-ownership-transfer"
  private _dogOwnershipTransfer = "http://localhost:3000/dog-ownership-transfer"

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
    } else if (dogData['fatherId'] !== 0 && dogData['motherId'] === 0){
      return this._http.post(this._puppyRegistrationOfUnknownMother, dogData);
    } else if (dogData['fatherId'] === 0 && dogData['motherId'] === 0) {
      return this._http.post(this._puppyRegistrationOfUnknownParents, dogData);
    }
  }

  getTotalDogs(userId) {
    return this._http.get(this._getTotalDogs + '/' + userId);
  }
  getSoldDogs(userId) {
    return this._http.get(this._getSoldDogs + '/' + userId);
  }
  getCurrentDogs(userId) {
    return this._http.get(this._getCurrentDogs + '/' + userId);
  }
  getDogDetails(dogId) {
    return this._http.get(this._getDogDetails + '/' + dogId);
  }

  hasAlreadySubmittedOwnershipTransfer(userId, dogId) {
    return this._http.get(this._hasAlreadySubmitted + '/' + userId + '/' + dogId);
  }

  dogOwnershipTransfer(transferData) {
    return this._http.post(this._dogOwnershipTransfer, transferData);
  }
}

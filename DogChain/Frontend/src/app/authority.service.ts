import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  private _unapprovedBreedersListUrl = "http://localhost:3000/unapproved-breeders";
  private _unapprovedDoctorsListUrl = "http://localhost:3000/unapproved-doctors";
  private _unapprovedDogBirthRegistrationsUrl = "http://localhost:3000/unapproved-dog-registrations";
  private _unapprovedOwnershipTransfersUrl = "http://localhost:3000/unapproved-dog-ownership-transfers";

  private _getUnapprovedBreederUrl = "http://localhost:3000/get-unapproved-breeder/";
  private _getUnapprovedDoctorUrl = "http://localhost:3000/get-unapproved-doctor/";
  private _getUnapprovedDogBirthRegistrationUrl = "http://localhost:3000/get-unapproved-dog-registration/";
  private _getUnapprovedOwnershipTransferUrl = "http://localhost:3000/get-unapproved-dog-ownership-transfer/";
  
  private _deleteBreederUrl = "http://localhost:3000/delete-breeder/";
  private _deleteDoctorUrl = "http://localhost:3000/delete-doctor/";
  private _deleteDogRegistrationUrl = "http://localhost:3000/delete-dog-registration/";
  private _deleteOwnershipTransferUrl = "http://localhost:3000/delete-ownership-transfer/";

  private _approveBreederUrl = "http://localhost:3000/approve-breeder";
  private _approveDoctorUrl = "http://localhost:3000/approve-doctor";
  private _approveDogRegistrationUrl = "http://localhost:3000/approve-dog-registration";
  private _approveOwnershipTransfesUrl = "http://localhost:3000/approve-ownership-transfer";
  
  private _breedersListUrl = "http://localhost:3000/breeders-list";
  private _doctorsListUrl = "http://localhost:3000/doctors-list";
  private _dogsListUrl = "http://localhost:3000/dogs-list";

  constructor(
    private _http: HttpClient
  ) { }

  getUnapprovedBreedersList() {
    return this._http.get(this._unapprovedBreedersListUrl);
  }

  getUnapprovedDoctorsList() {
    return this._http.get(this._unapprovedDoctorsListUrl);
  }

  getUnapprovedDogRegistrations() {
    return this._http.get(this._unapprovedDogBirthRegistrationsUrl);
  }

  getUnapprovedOwnershipTransfers() {
    return this._http.get(this._unapprovedOwnershipTransfersUrl);
  }

  getUnapprovedBreeder(userId) {
    return this._http.get(this._getUnapprovedBreederUrl + userId);
  }

  getUnapprovedDoctor(userId) {
    return this._http.get(this._getUnapprovedDoctorUrl + userId);
  }

  getUnapprovedDogRegistration(dogId) {
    return this._http.get(this._getUnapprovedDogBirthRegistrationUrl + dogId);
  }

  getUnapprovedOwnershipTransfer(dogId) {
    return this._http.get(this._getUnapprovedOwnershipTransferUrl + dogId);
  }

  deleteBreeder(userId) {
    return this._http.delete(this._deleteBreederUrl + userId);
  }

  deleteDoctor(userId) {
    return this._http.delete(this._deleteDoctorUrl + userId);
  }

  deleteDogRegistration(dogId) {
    return this._http.delete(this._deleteDogRegistrationUrl + dogId)
  }

  deleteOwnershipTransfer(dogId) {
    return this._http.delete(this._deleteOwnershipTransferUrl + dogId)
  }

  approveBreeder(userId) {
    return this._http.post(this._approveBreederUrl, userId);
  }

  approveDoctor(userId) {
    return this._http.post(this._approveDoctorUrl, userId);
  }

  approveDogRegistration(dogId) {
    return this._http.post(this._approveDogRegistrationUrl, dogId);
  }

  approveOwnershipTransfer(dogId) {
    return this._http.post(this._approveOwnershipTransfesUrl, dogId);
  }
  
  getBreedersList() {}

  getDoctorsList() {}

  getDogsList() {}
}

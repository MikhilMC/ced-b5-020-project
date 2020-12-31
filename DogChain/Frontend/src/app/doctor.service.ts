import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private _vaccinateDogUrl = "http://localhost:3000/vaccinate-dog";
  private _treatDogUrl = "http://localhost:3000/treat-dog";
  private _changeHospitalUrl = "http://localhost:3000/change-hospital"
  private _doctorVaccinationRecordUrl = "http://localhost:3000/doctor-vaccine-record";
  private _doctorTreatmentRecordUrl = "http://localhost:3000/doctor-treatment-record";
  private _getVaccineDataUrl = "http://localhost:3000/get-vaccine-data";
  private _getTreatmentDataUrl = "http://localhost:3000/get-treatment-data";
  private _dogVaccinesUrl = "http://localhost:3000/get-dog-vaccines"
  private _dogTreatmentUrl = "http://localhost:3000/get-dog-treatments"

  constructor(
    private _http: HttpClient
  ) { }

  vaccinateDog(vaccData) {
    return this._http.post(this._vaccinateDogUrl, vaccData);
  }

  treatDog(treatData) {
    return this._http.post(this._treatDogUrl, treatData);
  }

  changeHospital(hospitalData) {
    return this._http.post(this._changeHospitalUrl, hospitalData);
  }

  doctorVaccinationRecord(doctorId) {
    return this._http.get(this._doctorVaccinationRecordUrl + '/' + doctorId);
  }

  doctorTreatmentRecord(doctorId) {
    return this._http.get(this._doctorTreatmentRecordUrl + '/' + doctorId);
  }

  getVaccineData(vaccId) {
    return this._http.get(this._getVaccineDataUrl + '/' + vaccId);
  }

  getTreatmentData(treatId) {
    return this._http.get(this._getTreatmentDataUrl + '/' + treatId);
  }

  dogVaccines(dogId) {
    return this._http.get(this._dogVaccinesUrl + '/' + dogId);
  }

  dogTreatments(dogId) {
    return this._http.get(this._dogTreatmentUrl + '/' + dogId);
  }

}

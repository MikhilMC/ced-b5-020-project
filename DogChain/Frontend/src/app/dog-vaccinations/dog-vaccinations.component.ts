import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AuthService } from '../auth.service';
import { DoctorService } from "../doctor.service";

@Component({
  selector: 'app-dog-vaccinations',
  templateUrl: './dog-vaccinations.component.html',
  styleUrls: ['./dog-vaccinations.component.css']
})
export class DogVaccinationsComponent implements OnInit {

  dogId: Number;
  dogVaccineData: any[];
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _doctor: DoctorService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      console.log(this.dogId);
      this._doctor.dogVaccines(this.dogId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          // CASE : Dog's vaccination id list is empty
          this.isAvailable = false;
        } else if (result.hasOwnProperty('msg')) {
          // CASE : Wrong dogId. Working of this app is compromised.
          alert('Wrong dogId. Working of this app is compromised.')
          this._auth.logoutUser();
        } else {
          // CASE : Dog's vaccination id list is not empty
          this.isAvailable = true;
          this.dogVaccineData = <any>(result);
          console.log(this.dogVaccineData);
        }
      }, error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this._auth.logoutUser();
          }
        }
      })
    });
  }

}

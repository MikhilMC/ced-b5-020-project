import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
    private _router: Router,
    private _doctor: DoctorService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.dogId = Number(params.get('dogId'));
      console.log(this.dogId);
      this._doctor.dogVaccines(this.dogId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          this.dogVaccineData = <any>(result);
          console.log(this.dogVaccineData);
        }
      }, error => {
        console.log(error);
      })
    });
  }

}

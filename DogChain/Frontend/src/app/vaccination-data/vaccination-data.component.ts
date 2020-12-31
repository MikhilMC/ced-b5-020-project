import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-vaccination-data',
  templateUrl: './vaccination-data.component.html',
  styleUrls: ['./vaccination-data.component.css']
})
export class VaccinationDataComponent implements OnInit {

  vaccId: Number;
  vaccData: any;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _doctor: DoctorService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.vaccId = Number(params.get('vaccId'));
      console.log(this.vaccId);
      this._doctor.getVaccineData(this.vaccId)
      .subscribe(result => {
        if (result.hasOwnProperty('msg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          this.vaccData = result;
          console.log(this.vaccData);
        }
      }, error => {
        console.log(error);
      });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-total-vaccinated-dogs',
  templateUrl: './total-vaccinated-dogs.component.html',
  styleUrls: ['./total-vaccinated-dogs.component.css']
})
export class TotalVaccinatedDogsComponent implements OnInit {

  doctorId: Number;
  vaccineRecord: any[];
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _doctor: DoctorService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.doctorId = Number(params.get('doctorId'))
      console.log(this.doctorId);
      this._doctor.doctorVaccinationRecord(this.doctorId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          this.vaccineRecord = <any>(result);
          console.log(this.vaccineRecord);
        }
      }, error => {
        console.log(error);
      });
    })
  }

}

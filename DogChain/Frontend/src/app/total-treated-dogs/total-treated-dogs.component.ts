import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-total-treated-dogs',
  templateUrl: './total-treated-dogs.component.html',
  styleUrls: ['./total-treated-dogs.component.css']
})
export class TotalTreatedDogsComponent implements OnInit {

  doctorId: Number;
  treatmentData: any[];
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
      this._doctor.doctorTreatmentRecord(this.doctorId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          this.treatmentData = <any>(result);
          console.log(this.treatmentData);
        }
      }, error => {
        console.log(error);
      });
    })
  }

}

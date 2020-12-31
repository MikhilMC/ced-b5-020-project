import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "../doctor.service";

@Component({
  selector: 'app-treatment-data',
  templateUrl: './treatment-data.component.html',
  styleUrls: ['./treatment-data.component.css']
})
export class TreatmentDataComponent implements OnInit {

  treatId: Number;
  treatData: any;
  isAvailable: Boolean;

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _doctor: DoctorService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.treatId = Number(params.get('treatId'));
      console.log(this.treatId);
      this._doctor.getTreatmentData(this.treatId)
      .subscribe(result => {
        if (result.hasOwnProperty('emptyArrayMsg')) {
          this.isAvailable = false;
        } else {
          this.isAvailable = true;
          this.treatData = result;
          console.log(this.treatData);
        }
      }, error => {
        console.log(error);
      });
    });
  }

}

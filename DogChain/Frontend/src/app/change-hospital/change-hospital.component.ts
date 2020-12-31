import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "../doctor.service";

@Component({
  selector: 'app-change-hospital',
  templateUrl: './change-hospital.component.html',
  styleUrls: ['./change-hospital.component.css']
})
export class ChangeHospitalComponent implements OnInit {

  doctorId: Number;
  changeHospitalForm = this._fb.group({
    newHospitalName: ['', Validators.required]
  })

  constructor(
    private _actRoute: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _doctor: DoctorService
  ) { }

  ngOnInit(): void {
    this._actRoute.paramMap
    .subscribe(params => {
      this.doctorId = Number(params.get('doctorId'));
    });
  }

  changeHospital() {
    let changeHospitalData = {}
    changeHospitalData['doctorId'] = this.doctorId;
    changeHospitalData['newHospitalName'] = this.changeHospitalForm.get('newHospitalName').value;
    console.log(changeHospitalData);
    this._doctor.changeHospital(changeHospitalData)
    .subscribe(result => {
      console.log(result);
      if ("sameHospitalErrorMsg" in result) {
        alert(result["sameHospitalErrorMsg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true}).then(()=>{
          this._router.navigate(['/change-hospital', this.doctorId]);
        });
      } else {
        alert("Hospital changed")
        this._router.navigate(['/doctor-home']);
      }
    }, error => {
      console.log(error);
    });
  }

}

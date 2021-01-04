import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from '../auth.service';
import { DoctorService } from "../doctor.service";

@Component({
  selector: 'app-treat-dog',
  templateUrl: './treat-dog.component.html',
  styleUrls: ['./treat-dog.component.css']
})
export class TreatDogComponent implements OnInit {

  doctorId: Number;
  treatmentForm = this._fb.group({
    treatId: ['',[Validators.pattern(/([0-9]+)/), Validators.required]],
    dogId: ['',[Validators.pattern(/([0-9]+)/), Validators.required]],
    treatDate: ['', Validators.required],
    symptoms: ['', Validators.required],
    verdict: ['', Validators.required],
    prescription: ['', Validators.required]
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _doctor: DoctorService,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.doctorId = Number(localStorage.getItem('doctorId'));
  }

  treatDog() {
    // console.log(this.treatmentForm.value);
    // console.log(this.treatmentForm.get('symptoms').value.split(/,\n/));
    let treatmentData = {};
    treatmentData['treatId'] = this.treatmentForm.get('treatId').value;
    treatmentData['dogId'] = this.treatmentForm.get('dogId').value;
    treatmentData['treatDate'] = this.treatmentForm.get('treatDate').value;
    treatmentData['symptoms'] = this.treatmentForm.get('symptoms').value.split(/,\n/);
    treatmentData['verdict'] = this.treatmentForm.get('verdict').value;
    treatmentData['prescription'] = this.treatmentForm.get('prescription').value.split(/,\n/);
    treatmentData['doctorId'] = this.doctorId;
    console.log(treatmentData);
    this._doctor.treatDog(treatmentData)
    .subscribe(result => {
      console.log(result);
      if (result.hasOwnProperty('msg')) {
        // CASE : The given treatment id is already being used,
        //        or the given dog id is wrong
        alert(result["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true})
        .then(()=>{
          this._router.navigate(['/treat-dog', this.doctorId]);
        });
      } else if("doctorErrorMsg" in result) {
        // CASE : Wrong doctorId. Working of this app is compromised.
        alert('Wrong doctorId. Working of this app is compromised.')
        this._auth.logoutUser();
      } else {
        // CASE : Treatment data is saved into the blockchain.
        alert('Treatment data is added.');
        this._router.navigate(['/doctor-home']);
      }
    }, error => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          this._auth.logoutUser();
        }
      }
    });
  }

}

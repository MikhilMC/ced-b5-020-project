import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DoctorService } from '../doctor.service';

@Component({
  selector: 'app-vaccinate-dog',
  templateUrl: './vaccinate-dog.component.html',
  styleUrls: ['./vaccinate-dog.component.css']
})
export class VaccinateDogComponent implements OnInit {

  doctorId: Number
  vaccinationForm = this._fb.group({
    vaccId: ['',[Validators.pattern(/([0-9]+)/), Validators.required]],
    dogId: ['',[Validators.pattern(/([0-9]+)/), Validators.required]],
    vaccDate: ['', Validators.required],
    vaccName: ['', Validators.required]
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

  vaccinateDog() {
    let vaccinationData = this.vaccinationForm.value;
    vaccinationData['doctorId'] = this.doctorId;
    console.log(vaccinationData);
    this._doctor.vaccinateDog(vaccinationData)
    .subscribe(result => {
      console.log(result);
      if (result.hasOwnProperty('msg')) {
        // CASE : The given vaccine id is already being used,
        //        or the given dog id is wrong
        alert(result["msg"]);
        this._router.navigateByUrl('/dummy', {skipLocationChange: true})
        .then(()=>{
          this._router.navigate(['/vaccinate-dog', this.doctorId]);
        });
      } else if("doctorErrorMsg" in result) {
        // CASE : Wrong doctorId. Working of this app is compromised.
        alert('Wrong doctorId. Working of this app is compromised.')
        this._auth.logoutUser();
      } else {
        // CASE : Vaccination data is saved into the blockchain.
        alert('Vaccination data is added.');
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

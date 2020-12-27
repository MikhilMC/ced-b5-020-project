import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private _doctor: DoctorService
  ) { }

  ngOnInit(): void {
    this.doctorId = Number(localStorage.getItem('doctorId'));
  }

  vaccinateDog() {
    let vaccinationData = this.vaccinationForm.value;
    vaccinationData['doctorId'] = this.doctorId;
    console.log(vaccinationData);
  }
}

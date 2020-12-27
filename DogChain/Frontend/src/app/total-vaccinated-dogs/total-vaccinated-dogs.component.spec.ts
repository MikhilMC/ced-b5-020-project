import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalVaccinatedDogsComponent } from './total-vaccinated-dogs.component';

describe('TotalVaccinatedDogsComponent', () => {
  let component: TotalVaccinatedDogsComponent;
  let fixture: ComponentFixture<TotalVaccinatedDogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalVaccinatedDogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalVaccinatedDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

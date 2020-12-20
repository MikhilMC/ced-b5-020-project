import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDoctorComponent } from './single-doctor.component';

describe('SingleDoctorComponent', () => {
  let component: SingleDoctorComponent;
  let fixture: ComponentFixture<SingleDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

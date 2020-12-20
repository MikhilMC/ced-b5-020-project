import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogBirthRegistrationApprovalComponent } from './dog-birth-registration-approval.component';

describe('DogBirthRegistrationApprovalComponent', () => {
  let component: DogBirthRegistrationApprovalComponent;
  let fixture: ComponentFixture<DogBirthRegistrationApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogBirthRegistrationApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogBirthRegistrationApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogBirthRegistrationComponent } from './dog-birth-registration.component';

describe('DogBirthRegistrationComponent', () => {
  let component: DogBirthRegistrationComponent;
  let fixture: ComponentFixture<DogBirthRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogBirthRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogBirthRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

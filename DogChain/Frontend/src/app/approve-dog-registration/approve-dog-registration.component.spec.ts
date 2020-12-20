import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDogRegistrationComponent } from './approve-dog-registration.component';

describe('ApproveDogRegistrationComponent', () => {
  let component: ApproveDogRegistrationComponent;
  let fixture: ComponentFixture<ApproveDogRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveDogRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveDogRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDogRegistrationComponent } from './delete-dog-registration.component';

describe('DeleteDogRegistrationComponent', () => {
  let component: DeleteDogRegistrationComponent;
  let fixture: ComponentFixture<DeleteDogRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDogRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDogRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

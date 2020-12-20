import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsApprovalComponent } from './doctors-approval.component';

describe('DoctorsApprovalComponent', () => {
  let component: DoctorsApprovalComponent;
  let fixture: ComponentFixture<DoctorsApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

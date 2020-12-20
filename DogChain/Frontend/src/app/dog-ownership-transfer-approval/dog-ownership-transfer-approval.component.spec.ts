import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogOwnershipTransferApprovalComponent } from './dog-ownership-transfer-approval.component';

describe('DogOwnershipTransferApprovalComponent', () => {
  let component: DogOwnershipTransferApprovalComponent;
  let fixture: ComponentFixture<DogOwnershipTransferApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogOwnershipTransferApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogOwnershipTransferApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

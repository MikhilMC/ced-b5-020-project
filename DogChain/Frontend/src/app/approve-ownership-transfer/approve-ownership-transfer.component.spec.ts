import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveOwnershipTransferComponent } from './approve-ownership-transfer.component';

describe('ApproveOwnershipTransferComponent', () => {
  let component: ApproveOwnershipTransferComponent;
  let fixture: ComponentFixture<ApproveOwnershipTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveOwnershipTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveOwnershipTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

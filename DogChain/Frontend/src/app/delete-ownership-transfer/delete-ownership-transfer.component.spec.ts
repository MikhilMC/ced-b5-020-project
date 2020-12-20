import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOwnershipTransferComponent } from './delete-ownership-transfer.component';

describe('DeleteOwnershipTransferComponent', () => {
  let component: DeleteOwnershipTransferComponent;
  let fixture: ComponentFixture<DeleteOwnershipTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteOwnershipTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOwnershipTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

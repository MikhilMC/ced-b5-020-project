import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogOwnershipTransferComponent } from './dog-ownership-transfer.component';

describe('DogOwnershipTransferComponent', () => {
  let component: DogOwnershipTransferComponent;
  let fixture: ComponentFixture<DogOwnershipTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogOwnershipTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogOwnershipTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

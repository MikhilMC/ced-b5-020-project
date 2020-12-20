import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedersApprovalComponent } from './breeders-approval.component';

describe('BreedersApprovalComponent', () => {
  let component: BreedersApprovalComponent;
  let fixture: ComponentFixture<BreedersApprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedersApprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedersApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

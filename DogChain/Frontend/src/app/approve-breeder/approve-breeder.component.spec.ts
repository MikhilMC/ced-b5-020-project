import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveBreederComponent } from './approve-breeder.component';

describe('ApproveBreederComponent', () => {
  let component: ApproveBreederComponent;
  let fixture: ComponentFixture<ApproveBreederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveBreederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveBreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

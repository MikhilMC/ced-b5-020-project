import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentDataComponent } from './treatment-data.component';

describe('TreatmentDataComponent', () => {
  let component: TreatmentDataComponent;
  let fixture: ComponentFixture<TreatmentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatmentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

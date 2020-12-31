import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinationDataComponent } from './vaccination-data.component';

describe('VaccinationDataComponent', () => {
  let component: VaccinationDataComponent;
  let fixture: ComponentFixture<VaccinationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccinationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

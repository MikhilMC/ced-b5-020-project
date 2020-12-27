import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogTreatmentsComponent } from './dog-treatments.component';

describe('DogTreatmentsComponent', () => {
  let component: DogTreatmentsComponent;
  let fixture: ComponentFixture<DogTreatmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogTreatmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogTreatmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

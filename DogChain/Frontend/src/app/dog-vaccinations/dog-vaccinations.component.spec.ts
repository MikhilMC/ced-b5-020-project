import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DogVaccinationsComponent } from './dog-vaccinations.component';

describe('DogVaccinationsComponent', () => {
  let component: DogVaccinationsComponent;
  let fixture: ComponentFixture<DogVaccinationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogVaccinationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DogVaccinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

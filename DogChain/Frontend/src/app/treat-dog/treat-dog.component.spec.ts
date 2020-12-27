import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatDogComponent } from './treat-dog.component';

describe('TreatDogComponent', () => {
  let component: TreatDogComponent;
  let fixture: ComponentFixture<TreatDogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreatDogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

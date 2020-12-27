import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VaccinateDogComponent } from './vaccinate-dog.component';

describe('VaccinateDogComponent', () => {
  let component: VaccinateDogComponent;
  let fixture: ComponentFixture<VaccinateDogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VaccinateDogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VaccinateDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleDogComponent } from './single-dog.component';

describe('SingleDogComponent', () => {
  let component: SingleDogComponent;
  let fixture: ComponentFixture<SingleDogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleDogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleDogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

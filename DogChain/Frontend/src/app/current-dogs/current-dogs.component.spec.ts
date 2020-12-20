import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDogsComponent } from './current-dogs.component';

describe('CurrentDogsComponent', () => {
  let component: CurrentDogsComponent;
  let fixture: ComponentFixture<CurrentDogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

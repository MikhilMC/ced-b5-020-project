import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalDogsComponent } from './total-dogs.component';

describe('TotalDogsComponent', () => {
  let component: TotalDogsComponent;
  let fixture: ComponentFixture<TotalDogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalDogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldDogsComponent } from './sold-dogs.component';

describe('SoldDogsComponent', () => {
  let component: SoldDogsComponent;
  let fixture: ComponentFixture<SoldDogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoldDogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoldDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

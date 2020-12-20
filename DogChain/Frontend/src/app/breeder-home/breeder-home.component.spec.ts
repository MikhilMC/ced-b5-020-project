import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreederHomeComponent } from './breeder-home.component';

describe('BreederHomeComponent', () => {
  let component: BreederHomeComponent;
  let fixture: ComponentFixture<BreederHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreederHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreederHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

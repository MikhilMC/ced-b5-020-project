import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBreederComponent } from './single-breeder.component';

describe('SingleBreederComponent', () => {
  let component: SingleBreederComponent;
  let fixture: ComponentFixture<SingleBreederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleBreederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleBreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

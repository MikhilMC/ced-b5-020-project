import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecondaryMessageComponent } from './secondary-message.component';

describe('SecondaryMessageComponent', () => {
  let component: SecondaryMessageComponent;
  let fixture: ComponentFixture<SecondaryMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecondaryMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

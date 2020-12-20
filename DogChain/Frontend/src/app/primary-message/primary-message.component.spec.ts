import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryMessageComponent } from './primary-message.component';

describe('PrimaryMessageComponent', () => {
  let component: PrimaryMessageComponent;
  let fixture: ComponentFixture<PrimaryMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrimaryMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

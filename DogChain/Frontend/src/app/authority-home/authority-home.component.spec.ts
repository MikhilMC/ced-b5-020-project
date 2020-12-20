import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityHomeComponent } from './authority-home.component';

describe('AuthorityHomeComponent', () => {
  let component: AuthorityHomeComponent;
  let fixture: ComponentFixture<AuthorityHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorityHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

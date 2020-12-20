import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedersListComponent } from './breeders-list.component';

describe('BreedersListComponent', () => {
  let component: BreedersListComponent;
  let fixture: ComponentFixture<BreedersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

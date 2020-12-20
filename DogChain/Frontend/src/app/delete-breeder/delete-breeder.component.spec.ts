import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBreederComponent } from './delete-breeder.component';

describe('DeleteBreederComponent', () => {
  let component: DeleteBreederComponent;
  let fixture: ComponentFixture<DeleteBreederComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBreederComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBreederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

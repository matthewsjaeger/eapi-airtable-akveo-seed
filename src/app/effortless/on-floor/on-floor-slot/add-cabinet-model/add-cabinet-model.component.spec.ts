import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCabinetModelComponent } from './add-cabinet-model.component';

describe('AddCabinetModelComponent', () => {
  let component: AddCabinetModelComponent;
  let fixture: ComponentFixture<AddCabinetModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCabinetModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCabinetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

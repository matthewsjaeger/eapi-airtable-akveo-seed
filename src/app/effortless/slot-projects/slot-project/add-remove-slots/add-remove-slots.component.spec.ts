import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveSlotsComponent } from './add-remove-slots.component';

describe('AddRemoveSlotsComponent', () => {
  let component: AddRemoveSlotsComponent;
  let fixture: ComponentFixture<AddRemoveSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

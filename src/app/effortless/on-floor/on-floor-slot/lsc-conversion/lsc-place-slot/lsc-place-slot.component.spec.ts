import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LscPlaceSlotComponent } from './lsc-place-slot.component';

describe('LscPlaceSlotComponent', () => {
  let component: LscPlaceSlotComponent;
  let fixture: ComponentFixture<LscPlaceSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LscPlaceSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LscPlaceSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnFloorSlotComponent } from './on-floor-slot.component';

describe('OnFloorSlotComponent', () => {
  let component: OnFloorSlotComponent;
  let fixture: ComponentFixture<OnFloorSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnFloorSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnFloorSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

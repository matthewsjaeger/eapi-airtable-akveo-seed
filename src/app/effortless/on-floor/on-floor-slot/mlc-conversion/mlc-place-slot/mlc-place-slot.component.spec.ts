import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlcPlaceSlotComponent } from './mlc-place-slot.component';

describe('MlcPlaceSlotComponent', () => {
  let component: MlcPlaceSlotComponent;
  let fixture: ComponentFixture<MlcPlaceSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlcPlaceSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlcPlaceSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

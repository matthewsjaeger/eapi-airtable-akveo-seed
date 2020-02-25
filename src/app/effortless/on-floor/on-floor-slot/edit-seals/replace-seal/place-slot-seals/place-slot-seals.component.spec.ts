import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceSlotSealsComponent } from './place-slot-seals.component';

describe('PlaceSlotSealsComponent', () => {
  let component: PlaceSlotSealsComponent;
  let fixture: ComponentFixture<PlaceSlotSealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceSlotSealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceSlotSealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

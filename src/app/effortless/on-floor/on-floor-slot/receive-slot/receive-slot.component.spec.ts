import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceiveSlotComponent } from './receive-slot.component';

describe('ReceiveSlotComponent', () => {
  let component: ReceiveSlotComponent;
  let fixture: ComponentFixture<ReceiveSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceiveSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceiveSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActiveSlotComponent } from './update-active-slot.component';

describe('UpdateActiveSlotComponent', () => {
  let component: UpdateActiveSlotComponent;
  let fixture: ComponentFixture<UpdateActiveSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateActiveSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateActiveSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

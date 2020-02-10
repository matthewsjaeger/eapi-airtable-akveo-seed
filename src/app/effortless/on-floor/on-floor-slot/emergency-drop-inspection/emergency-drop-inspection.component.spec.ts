import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencyDropInspectionComponent } from './emergency-drop-inspection.component';

describe('EmergencyDropInspectionComponent', () => {
  let component: EmergencyDropInspectionComponent;
  let fixture: ComponentFixture<EmergencyDropInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmergencyDropInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyDropInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

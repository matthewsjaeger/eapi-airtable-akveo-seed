import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcInspectionComponent } from './gc-inspection.component';

describe('GcInspectionComponent', () => {
  let component: GcInspectionComponent;
  let fixture: ComponentFixture<GcInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

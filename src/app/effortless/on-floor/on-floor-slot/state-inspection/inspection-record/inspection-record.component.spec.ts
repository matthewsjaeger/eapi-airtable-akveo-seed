import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionRecordComponent } from './inspection-record.component';

describe('InspectionRecordComponent', () => {
  let component: InspectionRecordComponent;
  let fixture: ComponentFixture<InspectionRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectionRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectionRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

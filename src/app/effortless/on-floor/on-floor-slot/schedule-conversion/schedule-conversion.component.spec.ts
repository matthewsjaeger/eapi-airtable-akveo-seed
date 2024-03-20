import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleConversionComponent } from './schedule-conversion.component';

describe('ScheduleConversionComponent', () => {
  let component: ScheduleConversionComponent;
  let fixture: ComponentFixture<ScheduleConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

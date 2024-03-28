import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScheduleConversionComponent } from './project-schedule-conversion.component';

describe('ProjectScheduleConversionComponent', () => {
  let component: ProjectScheduleConversionComponent;
  let fixture: ComponentFixture<ProjectScheduleConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectScheduleConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScheduleConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

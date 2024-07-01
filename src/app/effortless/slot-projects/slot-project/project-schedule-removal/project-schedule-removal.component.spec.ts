import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScheduleRemovalComponent } from './project-schedule-removal.component';

describe('ProjectScheduleRemovalComponent', () => {
  let component: ProjectScheduleRemovalComponent;
  let fixture: ComponentFixture<ProjectScheduleRemovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectScheduleRemovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScheduleRemovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

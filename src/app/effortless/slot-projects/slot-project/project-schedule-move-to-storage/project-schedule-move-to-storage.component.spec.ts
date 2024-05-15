import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectScheduleMoveToStorageComponent } from './project-schedule-move-to-storage.component';

describe('ProjectScheduleMoveToStorageComponent', () => {
  let component: ProjectScheduleMoveToStorageComponent;
  let fixture: ComponentFixture<ProjectScheduleMoveToStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectScheduleMoveToStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectScheduleMoveToStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

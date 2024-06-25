import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectStorageToFloorComponent } from './project-storage-to-floor.component';

describe('ProjectStorageToFloorComponent', () => {
  let component: ProjectStorageToFloorComponent;
  let fixture: ComponentFixture<ProjectStorageToFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectStorageToFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectStorageToFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

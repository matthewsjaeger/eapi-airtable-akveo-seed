import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSetUpSlotComponent } from './project-set-up-slot.component';

describe('ProjectSetUpSlotComponent', () => {
  let component: ProjectSetUpSlotComponent;
  let fixture: ComponentFixture<ProjectSetUpSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSetUpSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSetUpSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

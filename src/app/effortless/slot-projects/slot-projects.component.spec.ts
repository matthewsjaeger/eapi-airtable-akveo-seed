import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotProjectsComponent } from './slot-projects.component';

describe('SlotProjectsComponent', () => {
  let component: SlotProjectsComponent;
  let fixture: ComponentFixture<SlotProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

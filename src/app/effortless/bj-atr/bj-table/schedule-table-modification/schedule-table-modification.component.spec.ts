import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTableModificationComponent } from './schedule-table-modification.component';

describe('ScheduleTableModificationComponent', () => {
  let component: ScheduleTableModificationComponent;
  let fixture: ComponentFixture<ScheduleTableModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTableModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTableModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTableRemoveComponent } from './schedule-table-remove.component';

describe('ScheduleTableRemoveComponent', () => {
  let component: ScheduleTableRemoveComponent;
  let fixture: ComponentFixture<ScheduleTableRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleTableRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleTableRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

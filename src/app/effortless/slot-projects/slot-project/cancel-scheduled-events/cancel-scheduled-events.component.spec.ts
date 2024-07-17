import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelScheduledEventsComponent } from './cancel-scheduled-events.component';

describe('CancelScheduledEventsComponent', () => {
  let component: CancelScheduledEventsComponent;
  let fixture: ComponentFixture<CancelScheduledEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelScheduledEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelScheduledEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

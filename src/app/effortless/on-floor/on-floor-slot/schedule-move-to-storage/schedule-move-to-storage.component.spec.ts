import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleMoveToStorageComponent } from './schedule-move-to-storage.component';

describe('ScheduleMoveToStorageComponent', () => {
  let component: ScheduleMoveToStorageComponent;
  let fixture: ComponentFixture<ScheduleMoveToStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleMoveToStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleMoveToStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

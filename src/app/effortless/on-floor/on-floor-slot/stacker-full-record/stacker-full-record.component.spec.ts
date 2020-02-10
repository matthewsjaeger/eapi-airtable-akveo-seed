import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackerFullRecordComponent } from './stacker-full-record.component';

describe('StackerFullRecordComponent', () => {
  let component: StackerFullRecordComponent;
  let fixture: ComponentFixture<StackerFullRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackerFullRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackerFullRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateInspectionComponent } from './state-inspection.component';

describe('StateInspectionComponent', () => {
  let component: StateInspectionComponent;
  let fixture: ComponentFixture<StateInspectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateInspectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

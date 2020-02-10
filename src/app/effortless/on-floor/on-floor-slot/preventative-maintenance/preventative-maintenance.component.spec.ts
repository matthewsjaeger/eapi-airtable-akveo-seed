import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventativeMaintenanceComponent } from './preventative-maintenance.component';

describe('PreventativeMaintenanceComponent', () => {
  let component: PreventativeMaintenanceComponent;
  let fixture: ComponentFixture<PreventativeMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventativeMaintenanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventativeMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

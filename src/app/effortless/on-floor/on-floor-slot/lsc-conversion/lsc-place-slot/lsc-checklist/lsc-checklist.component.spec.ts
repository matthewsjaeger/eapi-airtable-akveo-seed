import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LscChecklistComponent } from './lsc-checklist.component';

describe('LscChecklistComponent', () => {
  let component: LscChecklistComponent;
  let fixture: ComponentFixture<LscChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LscChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LscChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

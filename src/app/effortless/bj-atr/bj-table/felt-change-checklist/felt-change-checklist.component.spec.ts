import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeltChangeChecklistComponent } from './felt-change-checklist.component';

describe('FeltChangeChecklistComponent', () => {
  let component: FeltChangeChecklistComponent;
  let fixture: ComponentFixture<FeltChangeChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeltChangeChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeltChangeChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTableModificationComponent } from './complete-table-modification.component';

describe('CompleteTableModificationComponent', () => {
  let component: CompleteTableModificationComponent;
  let fixture: ComponentFixture<CompleteTableModificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteTableModificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTableModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

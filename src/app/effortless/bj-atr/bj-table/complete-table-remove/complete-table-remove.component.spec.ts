import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteTableRemoveComponent } from './complete-table-remove.component';

describe('CompleteTableRemoveComponent', () => {
  let component: CompleteTableRemoveComponent;
  let fixture: ComponentFixture<CompleteTableRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteTableRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteTableRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

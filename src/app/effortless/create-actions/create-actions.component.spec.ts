import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateActionsComponent } from './create-actions.component';

describe('CreateActionsComponent', () => {
  let component: CreateActionsComponent;
  let fixture: ComponentFixture<CreateActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

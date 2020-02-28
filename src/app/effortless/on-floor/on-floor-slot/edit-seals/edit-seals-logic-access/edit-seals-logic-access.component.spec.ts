import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSealsLogicAccessComponent } from './edit-seals-logic-access.component';

describe('EditSealsLogicAccessComponent', () => {
  let component: EditSealsLogicAccessComponent;
  let fixture: ComponentFixture<EditSealsLogicAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSealsLogicAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSealsLogicAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

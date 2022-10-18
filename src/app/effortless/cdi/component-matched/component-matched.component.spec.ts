import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentMatchedComponent } from './component-matched.component';

describe('ComponentMatchedComponent', () => {
  let component: ComponentMatchedComponent;
  let fixture: ComponentFixture<ComponentMatchedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentMatchedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentMatchedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

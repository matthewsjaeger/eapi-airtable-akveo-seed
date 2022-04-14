import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentGeneratedComponent } from './component-generated.component';

describe('ComponentGeneratedComponent', () => {
  let component: ComponentGeneratedComponent;
  let fixture: ComponentFixture<ComponentGeneratedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentGeneratedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentGeneratedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovalTypeComponent } from './removal-type.component';

describe('RemovalTypeComponent', () => {
  let component: RemovalTypeComponent;
  let fixture: ComponentFixture<RemovalTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemovalTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemovalTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

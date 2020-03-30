import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LscBreakComponent } from './lsc-break.component';

describe('LscBreakComponent', () => {
  let component: LscBreakComponent;
  let fixture: ComponentFixture<LscBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LscBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LscBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

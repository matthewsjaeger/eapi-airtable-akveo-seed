import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LscConversionComponent } from './lsc-conversion.component';

describe('LscConversionComponent', () => {
  let component: LscConversionComponent;
  let fixture: ComponentFixture<LscConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LscConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LscConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LscPlaceConversionComponent } from './lsc-place-conversion.component';

describe('LscPlaceConversionComponent', () => {
  let component: LscPlaceConversionComponent;
  let fixture: ComponentFixture<LscPlaceConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LscPlaceConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LscPlaceConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

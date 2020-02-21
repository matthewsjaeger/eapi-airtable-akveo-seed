import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlcConversionComponent } from './mlc-conversion.component';

describe('MlcConversionComponent', () => {
  let component: MlcConversionComponent;
  let fixture: ComponentFixture<MlcConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlcConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlcConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

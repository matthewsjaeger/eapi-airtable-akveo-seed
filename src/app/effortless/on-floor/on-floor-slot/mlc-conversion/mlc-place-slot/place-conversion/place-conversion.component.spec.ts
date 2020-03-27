import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceConversionComponent } from './place-conversion.component';

describe('PlaceConversionComponent', () => {
  let component: PlaceConversionComponent;
  let fixture: ComponentFixture<PlaceConversionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaceConversionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceConversionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

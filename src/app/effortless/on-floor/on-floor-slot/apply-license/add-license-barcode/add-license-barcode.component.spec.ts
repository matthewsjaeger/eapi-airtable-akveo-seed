import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLicenseBarcodeComponent } from './add-license-barcode.component';

describe('AddLicenseBarcodeComponent', () => {
  let component: AddLicenseBarcodeComponent;
  let fixture: ComponentFixture<AddLicenseBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLicenseBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLicenseBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

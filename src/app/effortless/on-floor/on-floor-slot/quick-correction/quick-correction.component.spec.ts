import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickCorrectionComponent } from './quick-correction.component';

describe('QuickCorrectionComponent', () => {
  let component: QuickCorrectionComponent;
  let fixture: ComponentFixture<QuickCorrectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickCorrectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

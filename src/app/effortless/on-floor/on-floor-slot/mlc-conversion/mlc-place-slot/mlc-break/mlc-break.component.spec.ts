import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlcBreakComponent } from './mlc-break.component';

describe('MlcBreakComponent', () => {
  let component: MlcBreakComponent;
  let fixture: ComponentFixture<MlcBreakComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlcBreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlcBreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

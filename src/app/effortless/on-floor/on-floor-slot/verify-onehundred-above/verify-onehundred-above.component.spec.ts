import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyOnehundredAboveComponent } from './verify-onehundred-above.component';

describe('VerifyOnehundredAboveComponent', () => {
  let component: VerifyOnehundredAboveComponent;
  let fixture: ComponentFixture<VerifyOnehundredAboveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyOnehundredAboveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyOnehundredAboveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

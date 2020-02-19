import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyFiftyOnehundredComponent } from './verify-fifty-onehundred.component';

describe('VerifyFiftyOnehundredComponent', () => {
  let component: VerifyFiftyOnehundredComponent;
  let fixture: ComponentFixture<VerifyFiftyOnehundredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyFiftyOnehundredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyFiftyOnehundredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

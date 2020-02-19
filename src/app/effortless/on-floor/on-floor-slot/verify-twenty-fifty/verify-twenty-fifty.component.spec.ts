import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTwentyFiftyComponent } from './verify-twenty-fifty.component';

describe('VerifyTwentyFiftyComponent', () => {
  let component: VerifyTwentyFiftyComponent;
  let fixture: ComponentFixture<VerifyTwentyFiftyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyTwentyFiftyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyTwentyFiftyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

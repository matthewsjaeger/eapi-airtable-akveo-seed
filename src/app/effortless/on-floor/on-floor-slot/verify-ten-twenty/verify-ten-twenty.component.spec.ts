import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyTenTwentyComponent } from './verify-ten-twenty.component';

describe('VerifyTenTwentyComponent', () => {
  let component: VerifyTenTwentyComponent;
  let fixture: ComponentFixture<VerifyTenTwentyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyTenTwentyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyTenTwentyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

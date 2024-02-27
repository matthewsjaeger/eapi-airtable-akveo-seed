import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjAtrComponent } from './bj-atr.component';

describe('BjAtrComponent', () => {
  let component: BjAtrComponent;
  let fixture: ComponentFixture<BjAtrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjAtrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjAtrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

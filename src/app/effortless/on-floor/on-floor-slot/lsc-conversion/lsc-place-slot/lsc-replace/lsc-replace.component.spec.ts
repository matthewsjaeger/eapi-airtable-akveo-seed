import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LscReplaceComponent } from './lsc-replace.component';

describe('LscReplaceComponent', () => {
  let component: LscReplaceComponent;
  let fixture: ComponentFixture<LscReplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LscReplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LscReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

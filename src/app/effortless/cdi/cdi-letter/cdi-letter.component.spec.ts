import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdiLetterComponent } from './cdi-letter.component';

describe('CdiLetterComponent', () => {
  let component: CdiLetterComponent;
  let fixture: ComponentFixture<CdiLetterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdiLetterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdiLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakSealComponent } from './break-seal.component';

describe('BreakSealComponent', () => {
  let component: BreakSealComponent;
  let fixture: ComponentFixture<BreakSealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreakSealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreakSealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

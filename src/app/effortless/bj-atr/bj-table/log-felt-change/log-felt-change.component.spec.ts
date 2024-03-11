import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogFeltChangeComponent } from './log-felt-change.component';

describe('LogFeltChangeComponent', () => {
  let component: LogFeltChangeComponent;
  let fixture: ComponentFixture<LogFeltChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogFeltChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogFeltChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

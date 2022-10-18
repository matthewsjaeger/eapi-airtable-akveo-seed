import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdiManualComponent } from './cdi-manual.component';

describe('CdiManualComponent', () => {
  let component: CdiManualComponent;
  let fixture: ComponentFixture<CdiManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdiManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdiManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

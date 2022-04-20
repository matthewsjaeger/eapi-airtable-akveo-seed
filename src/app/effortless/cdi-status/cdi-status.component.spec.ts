import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdiStatusComponent } from './cdi-status.component';

describe('CdiStatusComponent', () => {
  let component: CdiStatusComponent;
  let fixture: ComponentFixture<CdiStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdiStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdiStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

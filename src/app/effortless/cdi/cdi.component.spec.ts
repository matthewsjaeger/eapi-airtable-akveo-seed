import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdiComponent } from './cdi.component';

describe('CdiComponent', () => {
  let component: CdiComponent;
  let fixture: ComponentFixture<CdiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

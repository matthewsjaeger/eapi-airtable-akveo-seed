import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LscAddComponent } from './lsc-add.component';

describe('LscAddComponent', () => {
  let component: LscAddComponent;
  let fixture: ComponentFixture<LscAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LscAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LscAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

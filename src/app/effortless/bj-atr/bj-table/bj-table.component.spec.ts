import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjTableComponent } from './bj-table.component';

describe('BjTableComponent', () => {
  let component: BjTableComponent;
  let fixture: ComponentFixture<BjTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

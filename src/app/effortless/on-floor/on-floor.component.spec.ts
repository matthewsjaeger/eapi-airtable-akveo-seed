import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnFloorComponent } from './on-floor.component';

describe('OnFloorComponent', () => {
  let component: OnFloorComponent;
  let fixture: ComponentFixture<OnFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

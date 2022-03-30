import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiOnFloorComponent } from './multi-on-floor.component';

describe('MultiOnFloorComponent', () => {
  let component: MultiOnFloorComponent;
  let fixture: ComponentFixture<MultiOnFloorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiOnFloorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiOnFloorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

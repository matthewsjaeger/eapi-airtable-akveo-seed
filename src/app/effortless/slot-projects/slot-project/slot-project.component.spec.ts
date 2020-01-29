import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotProjectComponent } from './slot-project.component';

describe('SlotProjectComponent', () => {
  let component: SlotProjectComponent;
  let fixture: ComponentFixture<SlotProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlotProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureSlotComponent } from './configure-slot.component';

describe('ConfigureSlotComponent', () => {
  let component: ConfigureSlotComponent;
  let fixture: ComponentFixture<ConfigureSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

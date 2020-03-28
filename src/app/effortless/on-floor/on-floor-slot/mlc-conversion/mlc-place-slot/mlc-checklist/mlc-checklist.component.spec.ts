import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlcChecklistComponent } from './mlc-checklist.component';

describe('MlcChecklistComponent', () => {
  let component: MlcChecklistComponent;
  let fixture: ComponentFixture<MlcChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlcChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlcChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

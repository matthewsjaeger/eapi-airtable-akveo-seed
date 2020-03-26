import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlcReplaceComponent } from './mlc-replace.component';

describe('MlcReplaceComponent', () => {
  let component: MlcReplaceComponent;
  let fixture: ComponentFixture<MlcReplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlcReplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlcReplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

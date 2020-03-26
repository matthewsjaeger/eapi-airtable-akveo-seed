import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MlcAddComponent } from './mlc-add.component';

describe('MlcAddComponent', () => {
  let component: MlcAddComponent;
  let fixture: ComponentFixture<MlcAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MlcAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MlcAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

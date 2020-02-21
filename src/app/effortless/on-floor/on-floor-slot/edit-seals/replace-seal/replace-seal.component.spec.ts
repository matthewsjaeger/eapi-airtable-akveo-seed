import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceSealComponent } from './replace-seal.component';

describe('ReplaceSealComponent', () => {
  let component: ReplaceSealComponent;
  let fixture: ComponentFixture<ReplaceSealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplaceSealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceSealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

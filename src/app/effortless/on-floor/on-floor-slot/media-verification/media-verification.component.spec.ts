import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaVerificationComponent } from './media-verification.component';

describe('MediaVerificationComponent', () => {
  let component: MediaVerificationComponent;
  let fixture: ComponentFixture<MediaVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediaVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediaVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

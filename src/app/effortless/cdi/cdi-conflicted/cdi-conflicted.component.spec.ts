import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdiConflictedComponent } from './cdi-conflicted.component';

describe('CdiConflictedComponent', () => {
  let component: CdiConflictedComponent;
  let fixture: ComponentFixture<CdiConflictedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdiConflictedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdiConflictedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

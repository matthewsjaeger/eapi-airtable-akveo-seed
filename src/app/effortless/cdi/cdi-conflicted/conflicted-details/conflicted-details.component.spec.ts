import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictedDetailsComponent } from './conflicted-details.component';

describe('ConflictedDetailsComponent', () => {
  let component: ConflictedDetailsComponent;
  let fixture: ComponentFixture<ConflictedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConflictedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConflictedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

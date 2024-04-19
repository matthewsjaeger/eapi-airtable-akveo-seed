import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveReadOnlyComponent } from './resolve-read-only.component';

describe('ResolveReadOnlyComponent', () => {
  let component: ResolveReadOnlyComponent;
  let fixture: ComponentFixture<ResolveReadOnlyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveReadOnlyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveReadOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

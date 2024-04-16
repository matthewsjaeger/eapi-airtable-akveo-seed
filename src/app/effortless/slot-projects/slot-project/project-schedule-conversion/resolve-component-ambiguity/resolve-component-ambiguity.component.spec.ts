import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveComponentAmbiguityComponent } from './resolve-component-ambiguity.component';

describe('ResolveComponentAmbiguityComponent', () => {
  let component: ResolveComponentAmbiguityComponent;
  let fixture: ComponentFixture<ResolveComponentAmbiguityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveComponentAmbiguityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveComponentAmbiguityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

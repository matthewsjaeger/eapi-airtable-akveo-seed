import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveProgressiveAmbiguityComponent } from './resolve-progressive-ambiguity.component';

describe('ResolveProgressiveAmbiguityComponent', () => {
  let component: ResolveProgressiveAmbiguityComponent;
  let fixture: ComponentFixture<ResolveProgressiveAmbiguityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveProgressiveAmbiguityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveProgressiveAmbiguityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

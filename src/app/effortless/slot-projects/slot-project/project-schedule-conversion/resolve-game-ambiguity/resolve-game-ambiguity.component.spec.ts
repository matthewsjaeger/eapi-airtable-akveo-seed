import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolveGameAmbiguityComponent } from './resolve-game-ambiguity.component';

describe('ResolveGameAmbiguityComponent', () => {
  let component: ResolveGameAmbiguityComponent;
  let fixture: ComponentFixture<ResolveGameAmbiguityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolveGameAmbiguityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolveGameAmbiguityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

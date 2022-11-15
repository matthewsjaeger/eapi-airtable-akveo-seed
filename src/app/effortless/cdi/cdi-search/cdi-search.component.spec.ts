import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdiSearchComponent } from './cdi-search.component';

describe('CdiSearchComponent', () => {
  let component: CdiSearchComponent;
  let fixture: ComponentFixture<CdiSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdiSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

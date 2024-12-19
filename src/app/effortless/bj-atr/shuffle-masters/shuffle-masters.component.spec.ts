import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleMastersComponent } from './shuffle-masters.component';

describe('ShuffleMastersComponent', () => {
  let component: ShuffleMastersComponent;
  let fixture: ComponentFixture<ShuffleMastersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuffleMastersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuffleMastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuffleMasterComponent } from './shuffle-master.component';

describe('ShuffleMasterComponent', () => {
  let component: ShuffleMasterComponent;
  let fixture: ComponentFixture<ShuffleMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShuffleMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShuffleMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjProjectComponent } from './bj-project.component';

describe('BjProjectComponent', () => {
  let component: BjProjectComponent;
  let fixture: ComponentFixture<BjProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

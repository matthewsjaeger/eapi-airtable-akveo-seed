import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BjProjectsComponent } from './bj-projects.component';

describe('BjProjectsComponent', () => {
  let component: BjProjectsComponent;
  let fixture: ComponentFixture<BjProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BjProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BjProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

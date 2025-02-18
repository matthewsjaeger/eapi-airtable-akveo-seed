import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBjProjectComponent } from './new-bj-project.component';

describe('NewBjProjectComponent', () => {
  let component: NewBjProjectComponent;
  let fixture: ComponentFixture<NewBjProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBjProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBjProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

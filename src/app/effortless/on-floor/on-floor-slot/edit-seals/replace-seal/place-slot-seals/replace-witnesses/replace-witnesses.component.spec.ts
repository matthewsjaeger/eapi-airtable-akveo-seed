import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceWitnessesComponent } from './replace-witnesses.component';

describe('ReplaceWitnessesComponent', () => {
  let component: ReplaceWitnessesComponent;
  let fixture: ComponentFixture<ReplaceWitnessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplaceWitnessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceWitnessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

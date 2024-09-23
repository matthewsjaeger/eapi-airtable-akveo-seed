import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelicensingComponent } from './relicensing.component';

describe('RelicensingComponent', () => {
  let component: RelicensingComponent;
  let fixture: ComponentFixture<RelicensingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelicensingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelicensingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

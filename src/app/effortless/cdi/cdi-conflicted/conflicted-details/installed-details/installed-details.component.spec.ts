import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstalledDetailsComponent } from './installed-details.component';

describe('InstalledDetailsComponent', () => {
  let component: InstalledDetailsComponent;
  let fixture: ComponentFixture<InstalledDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstalledDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstalledDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

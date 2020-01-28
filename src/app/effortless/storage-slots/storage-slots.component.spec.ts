import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSlotsComponent } from './storage-slots.component';

describe('StorageSlotsComponent', () => {
  let component: StorageSlotsComponent;
  let fixture: ComponentFixture<StorageSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

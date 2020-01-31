import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageSlotComponent } from './storage-slot.component';

describe('StorageSlotComponent', () => {
  let component: StorageSlotComponent;
  let fixture: ComponentFixture<StorageSlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageSlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

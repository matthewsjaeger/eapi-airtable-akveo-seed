import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteMoveToStorageComponent } from './complete-move-to-storage.component';

describe('CompleteMoveToStorageComponent', () => {
  let component: CompleteMoveToStorageComponent;
  let fixture: ComponentFixture<CompleteMoveToStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompleteMoveToStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompleteMoveToStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

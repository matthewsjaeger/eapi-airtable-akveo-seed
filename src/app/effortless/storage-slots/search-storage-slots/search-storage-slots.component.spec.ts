import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStorageSlotsComponent } from './search-storage-slots.component';

describe('SearchStorageSlotsComponent', () => {
  let component: SearchStorageSlotsComponent;
  let fixture: ComponentFixture<SearchStorageSlotsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchStorageSlotsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchStorageSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

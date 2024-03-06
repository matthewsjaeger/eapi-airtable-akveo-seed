import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTablesComponent } from './search-tables.component';

describe('SearchTablesComponent', () => {
  let component: SearchTablesComponent;
  let fixture: ComponentFixture<SearchTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

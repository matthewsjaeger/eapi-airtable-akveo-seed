import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRemoveTablesComponent } from './add-remove-tables.component';

describe('AddRemoveTablesComponent', () => {
  let component: AddRemoveTablesComponent;
  let fixture: ComponentFixture<AddRemoveTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRemoveTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRemoveTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

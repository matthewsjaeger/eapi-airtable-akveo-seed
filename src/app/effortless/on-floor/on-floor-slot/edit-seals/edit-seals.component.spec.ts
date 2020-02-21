import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSealsComponent } from './edit-seals.component';

describe('EditSealsComponent', () => {
  let component: EditSealsComponent;
  let fixture: ComponentFixture<EditSealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSealsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

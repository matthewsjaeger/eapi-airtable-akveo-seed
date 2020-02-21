import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSealComponent } from './add-seal.component';

describe('AddSealComponent', () => {
  let component: AddSealComponent;
  let fixture: ComponentFixture<AddSealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

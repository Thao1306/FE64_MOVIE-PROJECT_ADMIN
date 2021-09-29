import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentDeleteUserComponent } from './dialog-content-delete-user.component';

describe('DialogContentDeleteUserComponent', () => {
  let component: DialogContentDeleteUserComponent;
  let fixture: ComponentFixture<DialogContentDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentDeleteUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentDeleteFilmComponent } from './dialog-content-delete-film.component';

describe('DialogContentDeleteFilmComponent', () => {
  let component: DialogContentDeleteFilmComponent;
  let fixture: ComponentFixture<DialogContentDeleteFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentDeleteFilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogContentDeleteFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

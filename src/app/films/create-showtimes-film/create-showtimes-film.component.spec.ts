import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShowtimesFilmComponent } from './create-showtimes-film.component';

describe('CreateShowtimesFilmComponent', () => {
  let component: CreateShowtimesFilmComponent;
  let fixture: ComponentFixture<CreateShowtimesFilmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateShowtimesFilmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShowtimesFilmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

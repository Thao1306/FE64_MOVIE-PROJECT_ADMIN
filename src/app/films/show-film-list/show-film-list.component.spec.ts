import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFilmListComponent } from './show-film-list.component';

describe('ShowFilmListComponent', () => {
  let component: ShowFilmListComponent;
  let fixture: ComponentFixture<ShowFilmListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFilmListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFilmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

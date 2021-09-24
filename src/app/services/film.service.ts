import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFilm, IFilmPagination } from '../models/film';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor() { }

  filmList = new BehaviorSubject<IFilm[]>([])

  setFilmList = (films: IFilm[]) => {
    this.filmList.next(films)
  }
}

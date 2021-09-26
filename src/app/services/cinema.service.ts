import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ICinema } from '../models/cinema';

@Injectable({
  providedIn: 'root',
})
export class CinemaService {
  listCinema = new BehaviorSubject<ICinema[]>([]);
  constructor() {}

  getListCinema = (cinema: ICinema[]) => {
    this.listCinema.next(cinema);
  };
}

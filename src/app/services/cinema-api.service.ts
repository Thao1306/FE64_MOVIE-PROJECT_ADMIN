import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TShowtime } from '../models/cinema';

@Injectable({
  providedIn: 'root',
})
export class CinemaApiService {
  constructor(private http: HttpClient) {}
  fetchCinema = (): Observable<any> => {
    return this.http.get(
      'https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinHeThongRap'
    );
  };

  fetchCinemaSystem = (cinemaId: string): Observable<any> => {
    return this.http.get(
      'https://movienew.cybersoft.edu.vn/api/QuanLyRap/LayThongTinCumRapTheoHeThong',
      {
        params: {
          maHeThongRap: cinemaId,
        },
      }
    );
  };

  createShowTimeFilm = (body: TShowtime): Observable<any> => {
    return this.http.post(
      'https://movienew.cybersoft.edu.vn/api/QuanLyDatVe/TaoLichChieu',
      body
    );
  };
}

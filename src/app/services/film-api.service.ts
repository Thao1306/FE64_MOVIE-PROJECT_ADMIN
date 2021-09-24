import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmApiService {
  constructor(private http: HttpClient) {}

  fetchFilmList = (currentPage: number, count: number): Observable<any> => {
    return this.http.get(
      'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayDanhSachPhimPhanTrang',
      {
        params: {
          soTrang: currentPage,
          soPhanTuTrenTrang: count,
        },
      }
    );
  };

  addMovie = (body: any): Observable<any> => {
    return this.http.post(
      'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/ThemPhimUploadHinh',
      body
    );
  };
}

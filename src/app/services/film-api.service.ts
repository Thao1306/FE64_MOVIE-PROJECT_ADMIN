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

  fetchFilmInfo = (id: number): Observable<any> => {
    return this.http.get(
      'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim',
      {
        params: {
          MaPhim: id,
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

  editMovie = (body: any): Observable<any> => {
    return this.http.post(
      'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/CapNhatPhimUpload',
      body
    );
  };

  deleteMovie = (id: number): Observable<any> => {
    return this.http.delete(
      'https://movienew.cybersoft.edu.vn/api/QuanLyPhim/XoaPhim',
      {
        params: {
          MaPhim: id,
        },
      }
    );
  };
}

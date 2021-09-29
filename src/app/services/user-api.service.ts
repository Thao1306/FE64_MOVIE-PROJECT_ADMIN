import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from './../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAPIService {
  constructor(private http: HttpClient) {}

  fetchUserList = (currentPage: number, count: number): Observable<any> => {
    return this.http.get(
      'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang',
      {
        params: {
          soTrang: currentPage,
          soPhanTuTrenTrang: count,
        },
      }
    );
  };

  fetchUserInfo = (id: string): Observable<any> => {
    return this.http.post(
      'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/LayThongTinNguoiDung',
      {
        params: {
          taiKhoan: id,
        },
      }
    );
  };

  addUser = (body: IUser): Observable<any> => {
    return this.http.post(
      'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThemNguoiDung',
      body
    );
  };

  editUser = (body: any): Observable<any> => {
    return this.http.post(
      'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung',
      body
    );
  };

  deleteUser = (id: string): Observable<any> => {
    return this.http.delete(
      'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/XoaNguoiDung',
      {
        params: {
          taiKhoan: id,
        },
      }
    );
  };

}

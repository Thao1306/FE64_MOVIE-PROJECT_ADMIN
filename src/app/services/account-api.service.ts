import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TAccAdmin } from '../models/account';

@Injectable({
  providedIn: 'root',
})
export class AccountApiService {
  constructor(private http: HttpClient) {}

  signIn = (accInfo: TAccAdmin): Observable<any> => {
    return this.http.post(
      'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/DangNhap',
      accInfo
    );
  };
  getInfoByToken = (token: string): Observable<any> => {
    return this.http.post(
      'https://movienew.cybersoft.edu.vn/api/QuanLyNguoiDung/ThongTinTaiKhoan',
      null
    );
  };
}

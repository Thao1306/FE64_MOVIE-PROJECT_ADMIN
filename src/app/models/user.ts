export interface IUser {
  maNhom: string;
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt?: string;
  soDT?: string;
  matKhau: string;
  maLoaiNguoiDung: string;
}
export interface IUserPagination {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items?: IUser[];
}

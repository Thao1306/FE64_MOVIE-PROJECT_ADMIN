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

export interface IShowTicket {
  giaVe: string;
  hinhAnh: string;
  maVe: string;
  ngayDat: string;
  tenPhim: string;
  thoiLuongPhim: string;
  maCumRap: string;
  maGhe: string;
  maHeThongRap: string;
  maRap: string;
  tenCumRap: string;
  tenGhe: string;
  tenHeThongRap: string;
  tenRap: string;
  danhSachGhe?: seatList[];
}

export interface seatList {
  maCumRap: string;
  maGhe: string;
  maHeThongRap: string;
  maRap: string;
  tenCumRap: string;
  tenGhe: string;
  tenHeThongRap: string;
  tenRap: string;
}

export interface IUserPagination {
  currentPage: number;
  count: number;
  totalPages: number;
  totalCount: number;
  items?: IUser[];
}

export interface ICinema {
  maHeThongRap: string;
  tenHeThongRap: string;
  biDanh: string;
  logo: string;
}

export interface ICinemaSystem {
  maCumRap: string;
  tenCumRap: string;
  diaChi: string;
  danhSachRap: { maRap: number; tenRap: string }[];
}

export type TShowtime = {
  maPhim: number;
  ngayChieuGioChieu: string;
  maRap: string;
  giaVe: number;
};
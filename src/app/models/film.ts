export interface IFilm {
  maPhim: number;
  tenPhim: string;
  biDanh: string;
  trailer: string;
  hinhAnh: string;
  moTa: string;
  ngayKhoiChieu: string;
  danhGia: number;
  hot: boolean;
  dangChieu: boolean;
  sapChieu: boolean;
}
export interface IFilmPagination {
    currentPage: number,
    count: number,
    totalPages: number,
    totalCount: number,
    items?: IFilm[]
} 

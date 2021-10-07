import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IFilm } from 'src/app/models/film';
import { FilmApiService } from 'src/app/services/film-api.service';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-film',
  templateUrl: './edit-film.component.html',
  styleUrls: ['./edit-film.component.css'],
})
export class EditFilmComponent implements OnInit, OnDestroy {
  @ViewChild('editMovie') editMovie!: NgForm;

  idFilm: number = 0;
  filmInfo: IFilm = {
    maPhim: 0,
    tenPhim: '',
    biDanh: '',
    trailer: '',
    hinhAnh: '',
    moTa: '',
    ngayKhoiChieu: '',
    danhGia: 0,
    hot: false,
    dangChieu: false,
    sapChieu: false,
  };
  files!: File;
  fetchFilmInfoSubscription: Subscription | undefined;
  editMovieSubscription: Subscription | undefined;
  isLoading: boolean = true;

  constructor(
    private activated: ActivatedRoute,
    private filmApiSv: FilmApiService,
    private router: Router
  ) {}

  handleSubmit() {
    if (this.editMovie.form.invalid) {
      alert('Thông tin bắt buộc không được để trống');
    } else {
      this.filmInfo = {
        ...this.filmInfo,
        sapChieu: !this.editMovie.value.dangChieu,
        ngayKhoiChieu: dayjs(this.editMovie.value.ngayKhoiChieu).format(
          'DD/MM/YYYY'
        ),
      };
      if (this.editMovie.value.hinhAnh) {
        this.filmInfo = { ...this.filmInfo, hinhAnh: this.files };
      } else {
        this.filmInfo = { ...this.filmInfo };
      }
      const newFilm: IFilm | any = { ...this.filmInfo };
      const formData = new FormData();

      for (let key in newFilm) {
        formData.append(key, newFilm[key]);
      }

      this.editMovieSubscription = this.filmApiSv.editMovie(formData).subscribe(
        (res) => {
          alert('Chỉnh sửa phim thành công');
          this.router.navigate(['/show-film']);
        },
        (err) => {
          alert(err.error.content);
        }
      );
    }
  }

  handleChangeFile = (event: any) => {
    this.files = event.target.files[0];
  };

  ngOnInit(): void {
    this.idFilm = this.activated.snapshot.params.id;
    this.fetchFilmInfoSubscription = this.filmApiSv
      .fetchFilmInfo(this.idFilm)
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.filmInfo = res.content;
        },
        (err) => {
          alert('Mã phim không hợp lệ');
          this.router.navigate(['/show-film']);
        }
      );
  }

  ngOnDestroy() {
    this.editMovieSubscription?.unsubscribe;
    this.fetchFilmInfoSubscription?.unsubscribe;
  }
}

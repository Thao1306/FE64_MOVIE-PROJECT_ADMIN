import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import * as dayjs from 'dayjs';
import { FilmApiService } from 'src/app/services/film-api.service';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css'],
})
export class AddFilmComponent implements OnInit {
  @ViewChild('addMovie') addFormMovie!: NgForm;
  @ViewChild('hinhAnh') hinh!: NgModel;
  files: File | undefined;
  constructor(private filmApiSv: FilmApiService) {}

  handleSubmit = () => {
    if (this.addFormMovie.form.status === 'INVALID') {
      alert('Nhập đủ thông tin mới thêm phim được');
    } else {
      const formMovie = {
        ...this.addFormMovie.value,
        hot: !!this.addFormMovie.value.hot,
        hinhAnh: this.files,
        dangChieu: !!parseInt(this.addFormMovie.value.dangChieu),
        sapChieu: !parseInt(this.addFormMovie.value.dangChieu),
        maNhom: 'GP01',
        ngayKhoiChieu: dayjs(this.addFormMovie.value.ngayKhoiChieu).format(
          'DD/MM/YYYY'
        ),
      };
      const formData = new FormData();
      for (let key in formMovie) {
        formData.append(key, formMovie[key]);
      }

      this.filmApiSv.addMovie(formData).subscribe(
        (res) => {
          console.log(res);
          alert('Thêm phim thành công');
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  handleChangeFile = (event: any) => {
    this.files = event.target.files[0];
  };
  ngOnInit(): void {}
}

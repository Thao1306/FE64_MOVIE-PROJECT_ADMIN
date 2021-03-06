import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICinema, ICinemaSystem, TShowtime } from 'src/app/models/cinema';
import { CinemaApiService } from 'src/app/services/cinema-api.service';
import { CinemaService } from 'src/app/services/cinema.service';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';
import { FilmApiService } from 'src/app/services/film-api.service';
import { IFilm } from 'src/app/models/film';

@Component({
  selector: 'app-create-showtimes-film',
  templateUrl: './create-showtimes-film.component.html',
  styleUrls: ['./create-showtimes-film.component.css'],
})
export class CreateShowtimesFilmComponent implements OnInit, OnDestroy {
  @ViewChildren('showtimeForm') showtimeFormList!: any;

  listCinema: ICinema[] | undefined;
  constructor(
    private activated: ActivatedRoute,
    private cinemaApiSv: CinemaApiService,
    private cinemaSv: CinemaService,
    private router: Router,
    private filmApiSv: FilmApiService
  ) {}
  panelOpenState = false;
  showTime!: ICinemaSystem[];
  showTimeModel!: TShowtime;
  fetchCinemaSubscription: Subscription | undefined;
  fetchCinemaSystemSubscription: Subscription | undefined;
  createShowTimeFilmSubscription: Subscription | undefined;
  listCinemaSubscription: Subscription | undefined;
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
  isLoading: boolean = true;

  fetchListCinema = () => {
    this.fetchCinemaSubscription = this.cinemaApiSv.fetchCinema().subscribe(
      (res) => {
        this.cinemaSv.getListCinema(res.content);
        this.isLoading = false
      },
      (err) => {
        console.log(err);
      }
    );
  };

  fetchFilmInfo = (id: number) => {
    this.filmApiSv.fetchFilmInfo(id).subscribe(
      (res) => {
        this.filmInfo = {
          ...res.content,
          ngayKhoiChieu: dayjs(res.content.ngayKhoiChieu).format('DD/MM/YYYY'),
        };
      },
      (err) => {
        alert("M?? phim kh??ng h???p l???!")
        this.router.navigate(['/show-film'])
      }
    );
  };

  fetchCinemaSystem = (idCinema: string) => {
    this.fetchCinemaSystemSubscription = this.cinemaApiSv
      .fetchCinemaSystem(idCinema)
      .subscribe(
        (res) => {
          this.showTime = res.content;
        },
        (err) => {
          console.log(err);
        }
      );
  };

  handleSubmit = () => {
    const showtimeForm = this.showtimeFormList._results.find(
      (item: any) => item.submitted === true
    );

    this.showTimeModel = {
      ...showtimeForm.value,
      maPhim: parseInt(this.activated.snapshot.params.id),
      giaVe: parseInt(showtimeForm.value.giaVe),
      maRap: showtimeForm.value.maRap.toString(),
      ngayChieuGioChieu: dayjs(showtimeForm.value.ngayChieuGioChieu).format(
        'DD/MM/YYYY hh:mm:ss'
      ),
    };

    this.createShowTimeFilmSubscription = this.cinemaApiSv
      .createShowTimeFilm(this.showTimeModel)
      .subscribe(
        (res) => {
          alert('T???o l???ch chi???u th??nh c??ng');
          this.router.navigate(['/show-film']);
        },
        (err) => {
          alert(err.error.content);
        }
      );
  };
  ngOnInit(): void {
    this.fetchFilmInfo(this.activated.snapshot.params.id);
    this.fetchListCinema();
    this.listCinemaSubscription = this.cinemaSv.listCinema.subscribe(
      (cinema: ICinema[]) => {
        this.listCinema = cinema;
      }
    );
  }
  ngOnDestroy() {
    this.fetchCinemaSystemSubscription?.unsubscribe;
    this.fetchCinemaSubscription?.unsubscribe;
    this.listCinemaSubscription?.unsubscribe;
    this.createShowTimeFilmSubscription?.unsubscribe;
  }
}

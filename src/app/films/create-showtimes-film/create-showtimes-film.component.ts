import { Component, OnDestroy, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICinema, ICinemaSystem, TShowtime } from 'src/app/models/cinema';
import { CinemaApiService } from 'src/app/services/cinema-api.service';
import { CinemaService } from 'src/app/services/cinema.service';
import * as dayjs from 'dayjs';
import { Subscription } from 'rxjs';

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
    private router: Router
  ) {}
  panelOpenState = false;
  showTime!: ICinemaSystem[];
  showTimeModel!: TShowtime;
  fetchCinemaSubscription: Subscription | undefined;
  fetchCinemaSystemSubscription: Subscription | undefined;
  createShowTimeFilmSubscription: Subscription | undefined;
  listCinemaSubscription: Subscription | undefined;

  fetchListCinema = () => {
    this.fetchCinemaSubscription = this.cinemaApiSv.fetchCinema().subscribe(
      (res) => {
        this.cinemaSv.getListCinema(res.content);
      },
      (err) => {
        console.log(err);
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
          alert('Tạo lịch chiếu thành công');
          this.router.navigate(['/show-film']);
        },
        (err) => {
          console.log(err);
          alert('Tạo lịch chiếu không thành công');
        }
      );
  };
  ngOnInit(): void {
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

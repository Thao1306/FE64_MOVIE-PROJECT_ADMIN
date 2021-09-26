import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { IFilm, IFilmPagination } from 'src/app/models/film';
import { FilmApiService } from 'src/app/services/film-api.service';
import { FilmService } from 'src/app/services/film.service';
import { DialogContentDeleteFilmComponent } from './dialog-content-delete-film/dialog-content-delete-film.component';

@Component({
  selector: 'app-show-film-list',
  templateUrl: './show-film-list.component.html',
  styleUrls: ['./show-film-list.component.css'],
})
export class ShowFilmListComponent implements OnInit, OnDestroy {
  @ViewChild('input') formInput!: NgModel;

  filmList: IFilm[] = [];
  fullFilmList: IFilm[] = [];
  filmPagination: IFilmPagination = {
    currentPage: 0,
    count: 0,
    totalPages: 0,
    totalCount: 0,
  };
  itemFilmSearch: IFilm | undefined;
  filmSearchList: IFilm[] = [];
  isLoading: boolean = true;
  notFoundFilm: boolean = false;
  fetchFilmListSubscription: Subscription | undefined;
  filmListSubscription: Subscription | undefined;
  deleteMovieSubscription: Subscription | undefined;

  constructor(
    private filmSv: FilmService,
    private filmApiSv: FilmApiService,
    private dialog: MatDialog
  ) {}

  fetchFilmList = (currentPage: number, count: number) => {
    this.fetchFilmListSubscription = this.filmApiSv
      .fetchFilmList(currentPage, count)
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.filmSv.setFilmList(res.content.items);
          this.filmPagination = res.content;
        },
        (err) => {
          console.log(err);
        }
      );
  };

  setFilmList = () => {
    this.filmListSubscription = this.filmSv.filmList.subscribe(
      (films: IFilm[]) => {
        this.filmList = films;
      }
    );
  };

  handleSearchFilm = () => {
    this.isLoading = true;
    this.fetchFilmListSubscription = this.filmApiSv
      .fetchFilmList(1, this.filmPagination.totalCount)
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.fullFilmList = res.content.items;
          this.itemFilmSearch = this.fullFilmList.find((item) => {
            return (
              this.formInput.value == item.maPhim.toString() ||
              this.formInput.value.toLowerCase() == item.tenPhim.toLowerCase()
            );
          });
          if (this.itemFilmSearch) {
            this.notFoundFilm = false;
            this.filmSearchList.splice(0, 1);
            this.filmSearchList.push(this.itemFilmSearch!);
            this.filmList = this.filmSearchList;
          } else {
            this.notFoundFilm = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };

  changePage = (event: PageEvent) => {
    this.fetchFilmList(event.pageIndex + 1, 10);
    this.setFilmList();
  };

  handleDelete = (id: number) => {
    const dialogRef = this.dialog.open(DialogContentDeleteFilmComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteMovieSubscription = this.filmApiSv.deleteMovie(id).subscribe(
          (res) => {
            alert('Xóa phim thành công');
            this.setFilmList();
          },
          (err) => {
            console.log(err);
            alert('Xóa phim không thành công');
          }
        );
      }
    });
  };

  ngOnInit(): void {
    this.fetchFilmList(1, 10);
    this.setFilmList();
  }
  ngOnDestroy() {
    this.filmListSubscription?.unsubscribe;
    this.fetchFilmListSubscription?.unsubscribe;
    this.deleteMovieSubscription?.unsubscribe;
  }
}

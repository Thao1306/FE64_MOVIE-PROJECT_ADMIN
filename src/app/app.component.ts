import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountApiService } from './services/account-api.service';
import { AccountService } from './services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'admin';
  constructor(
    private accApiSv: AccountApiService,
    private accSv: AccountService,
    private router: Router
  ) {}
  getInfoByTokenSubcription: Subscription | undefined;

  ngOnInit() {
    const token = `Beaber ${localStorage.getItem('t')}`;
    if (token) {
      this.getInfoByTokenSubcription = this.accApiSv
        .getInfoByToken(token!)
        .subscribe(
          (res) => {
            this.accSv.accInfo.next(res.content);
          },
          (err) => {
            this.router.navigate(['/']);
            alert('Vui lòng đăng nhập để vào trang quản lý');
            localStorage.removeItem('t');
          }
        );
    } else {
      this.router.navigate(['/']);
    }
  }
  ngOnDestroy() {
    this.getInfoByTokenSubcription?.unsubscribe;
  }
}

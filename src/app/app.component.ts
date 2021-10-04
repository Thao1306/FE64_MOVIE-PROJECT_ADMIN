import { Component, OnDestroy, OnInit } from '@angular/core';
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
  isLogin: boolean = false;
  constructor(
    private accApiSv: AccountApiService,
    private accSv: AccountService
  ) {}
  getInfoByTokenSubcription: Subscription | undefined;

  handleLogin(event: any) {
    this.isLogin = event;
  }

  ngOnInit() {
    const token = `Beaber ${localStorage.getItem('t')}`;
    if (token) {
      this.getInfoByTokenSubcription = this.accApiSv
        .getInfoByToken(token!)
        .subscribe(
          (res) => {
            this.accSv.accInfo.next(res.content);
            this.isLogin = true;
          },
          (err) => {
            alert(err.error.content);
          }
        );
    }
  }
  ngOnDestroy() {
    this.getInfoByTokenSubcription?.unsubscribe;
  }
}

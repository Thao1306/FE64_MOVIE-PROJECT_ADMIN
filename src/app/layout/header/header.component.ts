import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAccAdmin } from 'src/app/models/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(private accSv: AccountService, private route: Router) {}
  accInfo: IAccAdmin | null | undefined;
  accInfoSubscription: Subscription | undefined;
  handleLogOut = () => {
    localStorage.removeItem('t');
    this.route.navigate(['']);
    window.location.reload();
  };

  ngOnInit(): void {
    this.accInfoSubscription = this.accSv.accInfo.subscribe(
      (accountInfo: IAccAdmin | null) => {
        this.accInfo = accountInfo;
      }
    );
  }
  ngOnDestroy() {
    this.accInfoSubscription?.unsubscribe;
  }
}

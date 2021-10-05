import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IAccAdmin } from 'src/app/models/account';
import { AccountApiService } from 'src/app/services/account-api.service';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css'],
})
export class AccountAdminComponent implements OnInit, OnDestroy {
  @ViewChild('loginForm') loginForm!: NgForm;
  constructor(
    private accApiSv: AccountApiService,
    private route: Router,
    private accSv: AccountService
  ) {}
  accInfo: IAccAdmin | undefined;
  signInSubscription: Subscription | undefined;

  handleSubmit = () => {
    if (this.loginForm.valid) {
      this.signInSubscription = this.accApiSv
        .signIn(this.loginForm.value)
        .subscribe(
          (res) => {
            if (res.content.maLoaiNguoiDung === 'QuanTri') {
              this.accSv.getAccAdInfo(res.content);
              localStorage.setItem('t', res.content.accessToken);
              this.route.navigate(['/show-film']);
            } else {
              alert('Tài khoản Quản trị viên mới đăng nhập được');
            }
          },
          (err) => {
            alert(err.error.content)
          }
        );
    }
  };
  ngOnInit(): void {}
  ngOnDestroy() {
    this.signInSubscription?.unsubscribe;
  }
}

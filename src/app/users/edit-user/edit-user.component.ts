import { UserService } from './../../services/user.service';
import { UserAPIService } from './../../services/user-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IUser, IShowTicket } from './../../models/user';
import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  @ViewChild('editUser') editUser!: NgForm;

  idUser: string = '';
  isLoading: boolean = true;
  showTicket: IShowTicket[] = [];
  userInfo: IUser = {
    maNhom: ',',
    taiKhoan: '',
    hoTen: '',
    email: '',
    soDT: '',
    matKhau: '',
    maLoaiNguoiDung: '',
  };
  files!: File;
  fetchUserInfoSubscription: Subscription | undefined;
  editUserSubscription: Subscription | undefined;
  noTicket: boolean = true;

  constructor(
    private activated: ActivatedRoute,
    private userApiSv: UserAPIService,
    private userSv: UserService,
    private router: Router
  ) {}

  handleSubmit() {
    this.userInfo = { ...this.userInfo };
    console.log(this.userInfo);
    if (this.editUser.form.invalid) {
      alert('Thông tin bắt buộc không được để trống');
    } else {
      this.userInfo = { ...this.userInfo };
      const newUser: IUser | any = { ...this.userInfo };

      this.editUserSubscription = this.userApiSv.editUser(newUser).subscribe(
        (res) => {
          alert('Chỉnh sửa người dùng thành công');
          this.router.navigate(['/list-users']);
        },
        (err) => {
          console.log(err);
          alert('Chỉnh sửa người dùng không thành công');
        }
      );
    }
  }

  handleChangeFile = (event: any) => {
    this.files = event.target.files[0];
  };

  ngOnInit(): void {
    this.idUser = this.activated.snapshot.params.id;

    this.fetchUserInfoSubscription = this.userApiSv
      .fetchUserInfo(this.idUser)
      .subscribe(
        (res) => {
          this.userInfo = res.content;
          this.isLoading = false;
          this.showTicket = res.content.thongTinDatVe.map(
            (item: IShowTicket) => {
              return {
                ...item,
                ngayDat: dayjs(item.ngayDat).format('DD/MM/YYYY'),
              };
            }
          );
          if (this.showTicket.length) {
            this.noTicket = false;
          }
        },
        (err) => {
          alert(err.error.content);
          this.router.navigate(['/list-users']);
        }
      );
  }

  ngOnDestroy() {
    this.editUserSubscription?.unsubscribe;
    this.fetchUserInfoSubscription?.unsubscribe;
  }
}

import { IUser } from './../../models/user';
import { UserAPIService } from './../../services/user-api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @ViewChild('addUser') addFormUser!: NgForm;
  file: FileList | undefined;

  UserId: string = ''

  addUser:   {
    maNhom: string;
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDt: string;
    matKhau: string;
    maLoaiNguoiDung: string;
  }= {
    maNhom: "",
    taiKhoan: "",
    hoTen: "",
    email: "",
    soDt: "",
    matKhau: "",
    maLoaiNguoiDung: ""
  }

    constructor(private userApiSv: UserAPIService) { }

    handleSubmit(): void{

      if (this.addFormUser.form.status === 'INVALID') {
        alert('Nhập đủ thông tin mới được thêm người dùng');
      }
      const newUser = { ...this.addFormUser.value, UserId: ''};
      this.userApiSv.addUser(newUser).subscribe(
        (res) => {
          console.log(res);
          alert('Thêm người dùng thành công');
        },
        (err) => {
          console.log(err);
        }
      );
    };

    handleChangeFile = (event: any) => {
      this.file = event.target.file[0];
    };

  ngOnInit(): void {
  }

}

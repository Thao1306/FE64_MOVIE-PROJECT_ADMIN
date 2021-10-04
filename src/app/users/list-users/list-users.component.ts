import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { UserAPIService } from './../../services/user-api.service';
import { PageEvent } from '@angular/material/paginator';
import { NgModel } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IUser, IUserPagination } from './../../models/user';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { DialogContentDeleteUserComponent } from './dialog-content-delete-user/dialog-content-delete-user.component';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit, OnDestroy {
  @ViewChild('input') formInput!: NgModel;

  constructor(
    private userSv: UserService,
    private userApiSv: UserAPIService,
    private dialog: MatDialog
  ) {}

  //Tạo biến hứng
  userList: IUser[] = [];
  fullUserList: IUser[] = [];
  userPagination: IUserPagination = {
    currentPage: 0,
    count: 0,
    totalPages: 0,
    totalCount: 0,
  };
  itemUserSearch: IUser | undefined;
  userSearchList: IUser[] = [];
  isLoading: boolean = true;
  notFoundUser: boolean = false;
  fetchUserListSubscription: Subscription | undefined;
  userListSubscription: Subscription | undefined;
  deleteUserSubscription: Subscription | undefined;

  fetchUserList = (currentPage: number, count: number) => {
    this.fetchUserListSubscription = this.userApiSv
      .fetchUserList(currentPage, count)
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.userSv.setUserList(res.content.items);
          this.userPagination = res.content;
        },
        (err) => {
          console.log(err);
        }
      );
  };

  setUserList = () => {
    this.userListSubscription = this.userSv.userList.subscribe(
      (users: IUser[]) => {
        this.userList = users;
      }
    );
  };

  handleSearchUser = () => {
    this.isLoading = true;
    this.fetchUserListSubscription = this.userApiSv
      .fetchUserList(1, this.userPagination.totalCount)
      .subscribe(
        (res) => {
          this.isLoading = false;
          this.fullUserList = res.content.items;
          this.itemUserSearch = this.fullUserList.find((item) => {
            return (
              this.formInput.value == item.taiKhoan ||
              this.formInput.value.trim().toLowerCase() ==
                item.hoTen.trim().toLowerCase()
            );
          });

          if (this.itemUserSearch) {
            this.notFoundUser = false;
            this.userSearchList.splice(0, 1);
            this.userSearchList.push(this.itemUserSearch!);
            this.userList = this.userSearchList;
          } else {
            this.notFoundUser = true;
          }
        },
        (err) => {
          console.log(err);
        }
      );
  };

  changePage = (event: PageEvent) => {
    this.fetchUserList(event.pageIndex + 1, 10);
    this.setUserList();
  };

  handleDelete = (id: any) => {
    const dialogRef = this.dialog.open(DialogContentDeleteUserComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUserSubscription = this.userApiSv.deleteUser(id).subscribe(
          (res) => {
            alert('Xóa người dùng thành công');
            this.setUserList();
          },
          (err) => {
            console.log(err);
            alert('Người dùng này đã đặt vé xem phim không thể xóa!');
          }
        );
      }
    });
  };

  ngOnInit(): void {
    this.fetchUserList(1, 10);
    this.setUserList();
  }
  ngOnDestroy() {
    this.userListSubscription?.unsubscribe;
    this.fetchUserListSubscription?.unsubscribe;
    this.deleteUserSubscription?.unsubscribe;
  }
}

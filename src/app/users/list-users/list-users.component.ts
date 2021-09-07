import { IUser } from './../../models/user';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserAPIService } from './../../services/user-api.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit, OnDestroy {

  constructor(
    private userSv: UserService,
    private userApiSv: UserAPIService
  ) { }

  fetchUserSubscription: Subscription | undefined;
  userListSubscription: Subscription | undefined;

  isLoading: boolean = false;

   //Tạo biến hứng
   userList: IUser[] = [];

   fetchUsers = () => {
    this.isLoading = true ;
    this.fetchUserSubscription = this.userApiSv.fetchUsers().subscribe(
      (res:any) => {
        console.log(res);
        this.userSv.setUserList(res.content);
        this.isLoading = false ;
      },
      (err) => {
        console.log(err);
      }
    );
  };

  ngOnInit(){
    this.fetchUsers();

    console.log(this.userSv.userList)

    //Lấy dữ liệu từ service và lưu vào biến hứng
    //this.movieList = this.movieSv.movieList;
    this.userListSubscription = this.userSv.userList.subscribe((users: IUser[]) => {
      this.userList = users
    });
  }

    //lifecycle chạy lúc component hủy (tườn ứng với willUnMount của react)
    ngOnDestroy(){
      this.fetchUserSubscription?.unsubscribe();
      this.userListSubscription?.unsubscribe;
    }

}

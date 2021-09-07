import { IUser } from './../models/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userList = new BehaviorSubject<IUser[]>([]);

  setUserList = (list: IUser[]) => {
    this.userList.next(list);
  };


  constructor() { }
}
